import "dotenv/config";
import {BadRequestError, UnauthorizeError, ForbiddenError} from "../src/utils/AppError.js";
import {asyncHandler} from "../src/utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {verifyDevice} from "../src/service/verifyDevice.js";


export const regenerate = async  (req, res, next) => {
   const refreshToken = req.cookies.refreshToken;
   if(!refreshToken){
	   throw new UnauthorizeError("No refresh token", "BAD_TOKEN");
   }
   try{
	   const payLoad = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
	   const device = await verifyDevice(payLoad.id, payLoad.deviceId, payLoad.tokenVersion);
	   if(!device.success){
		   throw new UnauthorizeError("Session expired", "UNAUTHORIZE_ERROR");
	   }
	   //GENERATE MEW ACCESS TOKEN//
	   const NewAccessToken = jwt.sign({id: payLoad.id, deviceId: payLoad.deviceId, tokenVersion: payLoad.tokenVersion}, process.env.ACCESS_SECRET, {expires: "15m"});
	   res.json({accessToken: NewAccessToken});
	  
	  
   }catch(err){
	   throw new ForbiddenError("Session expired", "FORBIDDEN_REQUEST");
   }
});
	