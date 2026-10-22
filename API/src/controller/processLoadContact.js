import { asyncHandler } from "../utils/asyncHandler.js";
import fetchContact from "../service/loadContact.js";

export const loadContact = asyncHandler(async (req, res) => {
   const userID = req.user.id; 
   const load = await fetchContact(userID);

   if (!load.success) {
     return res.status(200).json({ success: false, data: [] });
   }
   res.status(200).json({ success: true, data: load.data });
});