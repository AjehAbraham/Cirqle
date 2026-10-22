import { ContactList } from "../models/contactListModel.js";

async function getContact(userID, ID){
    const get = await ContactList.findOne({_id: ID, UniqueID: userID});
    if(!get) return {success: false};
    return {success: true, get};
}
export default getContact;