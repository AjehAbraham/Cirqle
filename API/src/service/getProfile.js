import { registerModel } from "../models/registerModel.js";
import { ContactList } from "../models/contactListModel.js";
import { aboutModel } from "../models/AboutModel.js";


export async function getProfile(userID, ID){
  const user = await registerModel.findById({_id: ID});
  if(!user) return {success: false};
  let aboutData;
  let contactData;
  const about = await aboutModel.findOne({UniqueID: ID});
  if(!about) aboutData = [];
  else aboutData = about;
  const contact = await ContactList.findOne({UniqueID: userID, CountryCode: user.CountryCode, Phone: user.Phone});
  if(!contact) contactData = [];
  else contactData = contact;
  return {success: true, data: {User: user, Info: aboutData, saved: contactData}};
}