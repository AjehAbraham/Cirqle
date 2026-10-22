import "dotenv/config";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verify } from "../service/verifyOTP.js";
import { BadRequestError, InternalServerError} from "../utils/AppError.js";
import jwt from "jsonwebtoken";


export const processOTP = asyncHandler(async (req, res, next) => {
  const {countryCode, Tel, otp, session} = req.body;
  const { browser, os, device, raw } = req.parsedUA || {};
  const userAgentObject = { browser, os, device, raw }; 
  const deviceName = `${device} on ${os}`;
  const IP = req.body.ip;
  
  const result = await verify(otp, countryCode, Tel, session, IP, userAgentObject, deviceName);
   if(!result.success) return res.status(200).json(result);

   const payLoad = {
	  id: result.user.id,
	  deviceId: result.user.deviceId,
	  tokenVersion: result.user.tokenVersion
   };
   const NewaccessToken = jwt.sign(payLoad , process.env.ACCESS_TOKEN_SECRET, {expiresIn: "90d"});
   const refreshToken = jwt.sign(payLoad, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "15m"});
   
   
   res.cookie('refreshToken', refreshToken, {
	   httpOnly: true,
     secure: true,
     sameSite: "lax",
     maxAge: 15*60*1000
   });
  res.cookie('access_token', NewaccessToken, {
	   httpOnly: true,
     secure: true,
     sameSite: "lax",
     maxAge: 90*24*60*60*1000
   });
   res.cookie('deviceToken', result.deviceCode, {
     httpOnly: true,
     secure: true,
     sameSite: "lax",
     maxAge: 30*24*60*60*1000
   });
  res.status(200).json({
    success: true,
    data: {user: result.user}
  });
});