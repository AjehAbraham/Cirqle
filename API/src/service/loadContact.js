import { ContactList } from "../models/contactListModel.js";
import { aboutModel } from "../models/AboutModel.js";
import { registerModel } from "../models/registerModel.js";

async function fetchContact(userID){
  const lists = await ContactList.find({ UniqueID: userID }).lean();
  if (!lists.length) return { success: true, data: [] };

  const data = await Promise.all(
    lists.map(async (contact) => {
      let contactUserId = contact.ContactUserID;
      let contactUser = null;

      if (!contactUserId) {
        contactUser = await registerModel.findOne({ 
          CountryCode: contact.CountryCode, 
          Phone: contact.Phone 
        }).lean();

        if (contactUser) {        
          await ContactList.findOneAndUpdate(
            { UniqueID: userID, CountryCode: contact.CountryCode, Phone: contact.Phone },
            { $set: { ContactUserID: contactUser._id } }
          );
          contactUserId = contactUser._id;
        }
      } else {
        
        contactUser = await registerModel.findOne({ _id: contactUserId }).lean();
      }

      
      let about = null;
      if (contactUserId) {
        about = await aboutModel.findOne({ UniqueID: contactUserId }).lean();
      }

      return {
        ...contact,
        ContactUserID: contactUserId || contact.ContactUserID,
        bio: about?.About || "",
        imageUrl: about?.ImageUrl || ""
      };
    })
  );

  return { success: true, data };
}
export default fetchContact;