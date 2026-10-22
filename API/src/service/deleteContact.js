import {ContactList} from "../models/contactListModel.js";
import { ForbiddenError } from "../utils/AppError.js";

export async function deleteContact(userID, id, cCode, phone) {
    const findList = await ContactList.findOne({_id: id, CountryCode: cCode, Phone: phone});
    if(!findList) return {success: false};
    if(findList.UniqueID.toString() !== userID.toString()) throw new ForbiddenError("Forbidden", "FORBIDDEN_ERROR");
    const deleteC = await ContactList.findByIdAndDelete({_id: id});
    if(!deleteC) throw new {success: false, statusCode: 500, code: "DELETE_CONTACT_FAILED", message: "failed to delete contact"};
    return {success: true, data: deleteC};
}
