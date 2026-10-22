import {asyncHandler} from "../utils/asyncHandler.js";
import { deleteContact } from "../service/deleteContact.js";

export const processDelContact = asyncHandler (async (req, res, next) => {
const userID = req.user.id;
 const {id, cCode, phone} = req.body;
 const deletePhone = await deleteContact(userID, id, cCode, phone);
 res.status(200).json({success: deletePhone.success});  
});