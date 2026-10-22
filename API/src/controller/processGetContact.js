import { asyncHandler } from "../utils/asyncHandler.js";
import getContact from "../service/getContact.js";

export const processGetContact = asyncHandler (async (req, res, next) => {
 const userID = req.user.id;
 const ID = req.body.id;
  const get = await getContact(userID, ID);
  if(!get.success){
    res.status(200).json({success: false, data: []});
  }
  res.status(200).json({success: true, data: get.get});
  
});