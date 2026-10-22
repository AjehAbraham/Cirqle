import {InternalServerError} from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { VerifyContact, SaveContact, EditContact } from "../service/saveContact.js";


export const processContact = asyncHandler ( async (req, res, next) => {
  const userID = req.user.id;
  const {route, fullName, firstName, lastName, cCode, phone} = req.body;

  const verify = await VerifyContact(userID, cCode, phone );
 
  if(verify.success && route === "edit"){
   const edit = await EditContact(userID, fullName, firstName, lastName, cCode, phone );
   if(!edit) throw new InternalServerError("Failed to edit contact");
   res.status(200).json({success: true, data: edit.edit});
}else if(route === "save"){
  const save = await SaveContact(userID, fullName, firstName, lastName, cCode, phone );
 if(!save) throw new InternalServerError("Failed to save contact");
 res.status(200).json({success: true, data: save.save});
}

});