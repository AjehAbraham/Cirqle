import "dotenv/config";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/AppError.js";
import verifyDevice from "../service/verifyDevice.js";

export const authenticate = async (req, res, next) => {
 const accessToken = req.cookies?.access_token;
 const refreshToken = req.cookies?.refreshToken;

 try{
   const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
   const device = await verifyDevice(decoded.id, decoded.deviceId, decoded.tokenVersion);
   if(!device.success) throw new UnauthorizedError("BAD_TOKEN");

   req.user = decoded;
   try {
     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
   } catch(rErr) {
     
	if(rErr.name === "TokenExpiredError") {
       const newRefresh = jwt.sign(
         {id: decoded.id, deviceId: decoded.deviceId, tokenVersion: decoded.tokenVersion},
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn: "15m"}
       );
       res.cookie("refreshToken", newRefresh, {httpOnly: true, secure: true, sameSite: "lax",  maxAge: 15*60*1000});
     }
   }

   next();
 } catch(err){
   throw new UnauthorizedError("SESSION_EXPIRED"); 
 }
}