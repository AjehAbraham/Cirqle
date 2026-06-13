import "dotenv/config";
import {BadRequestError, UnauthorizedError, ForbiddenError} from "../utils/AppError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import verifyDevice from "../service/verifyDevice.js";


export const regenerate = asyncHandler (async  (req, res, next) => {
   const refreshToken = req.cookies.refreshToken;
   if(!refreshToken){
	   throw new UnauthorizedError("No refresh token", "BAD_TOKEN");
   }
   try{
	   const payLoad = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
	   const device = await verifyDevice(payLoad.id, payLoad.deviceId, payLoad.tokenVersion);
	   if(!device.success){
		   throw new UnauthorizedError("Session expired", "UNAUTHORIZE_ERROR");
	   }
	   //GENERATE MEW ACCESS TOKEN//
	   const NewAccessToken = jwt.sign({id: payLoad.id, deviceId: payLoad.deviceId, tokenVersion: payLoad.tokenVersion}, process.env.ACCESS_SECRET, {expires: "15m"});
	   res.json({accessToken: NewAccessToken});
	  
	  
   }catch(err){
	   throw new ForbiddenError("Session expired", "FORBIDDEN_REQUEST");
   }
});
	