import { asyncHandler } from "../utils/asyncHandler.js";
import { DeleteAccountService } from "../service/deleteAccount.js";


export const processDelete = asyncHandler (async (req, res, next) =>{
   const userID = req.user.id;
   const {phone} = req.body;
   const orignalPhone = `${req.user.cCode} ${req.user.phone}`;
    const d = await DeleteAccountService(userID, phone);
    if(!d) return res.status(200).json({success: false, message: "Failed to delete account"});
    res.clearCookie('refreshToken', {httpOnly: true, secure: true, sameSite: "lax", path: "/"});
    res.clearCookie('access_Token', {httpOnly: true, secure: true, sameSite: "lax", path: "/"});
    res.clearCookie('deviceCode', {httpOnly: true, secure: true, sameSite: "lax", path: "/"});
    return {success: true, message: "Account deleted"};
});