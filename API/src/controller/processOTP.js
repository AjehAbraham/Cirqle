import "dotenv/config";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verify } from "../service/verifyOTP.js";
import { BadRequestError, InternalServerError} from "../utils/AppError.js";
import jwt from "jsonwebtoken";


export const processOTP = asyncHandler(async (req, res, next) => {
  const Tel = req.body.Tel;
  const CountryCode = req.body.CountryCode;
  const IP = req.body.ip;
  const UserAgent = req.body.UserAgent;
  const OTP = req.body.otp;
  
  if (!OTP) {
    throw new BadRequestError("OTP is required", "OTP_REQUIRED");
  }

  const result = await verify(OTP, CountryCode, Tel, IP, UserAgent, true);
   if(!result.success){
	   throw new InternalServerError("Error occured trying to complete your request", "OTP_VALIDATION_FAILED");
   }
   const payLoad = {
	  id: result.user.id,
	  deviceId: result.user.deviceId,
	  tokenVersion: result.user.tokenVersion
   };
   const NewaccessToken = jwt.sign(payLoad , process.env.ACCESS_SECRET, {expiresIn: "15m"});
   const refreshToken = jwt.sign(payLoad, process.env.REFRESH_SECRET, {expiresIn: "90d"});
   
   
   res.cookie('refreshToken', refreshToken, {
	 httpOnly: true,
     secure: true,
     sameSite: "lax",
     maxAge: 90 * 24 * 60 * 60 * 1000 
   });
  
  res.status(200).json({
    success: true,
    user: result.user,
	accessToken: NewaccessToken
  });
});