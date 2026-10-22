import "dotenv/config";
import {BadRequestError, UnauthorizedError, ForbiddenError} from "../utils/AppError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import verifyDevice from "../service/verifyDevice.js";



export const regenerate = asyncHandler(async (req, res) => {
   /*const refreshToken = req.cookies?.refreshToken;
   if(!refreshToken) throw new UnauthorizedError("No refresh token");

   const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
   const device = await verifyDevice(payload.id, payload.deviceId, payload.tokenVersion);
   if(!device.success) throw new UnauthorizedError("Session expired");

   const newAccessToken = jwt.sign(
     {id: payload.id, deviceId: payload.deviceId, tokenVersion: payload.tokenVersion},
     process.env.ACCESS_TOKEN_SECRET,
     {expiresIn: "15m"}
   );

   //res.cookie("access_token", newAccessToken, {httpOnly: true});
   res.status(200).json({success: true, data: {accessToken: newAccessToken}});*/
});