import { asyncHandler } from "../utils/asyncHandler.js";
import { BadRequestError, TooManyRequestsError } from "../utils/AppError.js";
import { sendOTP } from "../service/sendOTP.js";
import { RateLimiting } from "../models/RateLimiting.js";

export const processLogin = asyncHandler(async (req, res, next) =>{
    const { countryCode: cCode, Tel, Code: code } = req.body;
    const IP = req.body.ip || req.ip;
    
  const { browser, os, device, raw } = req.parsedUA || {};
  const userAgentObject = { browser, os, device, raw };  
  const deviceName = `${device} on ${os}`;

    const Exp = new Date(Date.now() + 30*60*1000);
    const Phone = `${cCode}${Tel}`;
    const WINDOW_MS = 10*60*1000;
    const MAX_REQUEST = 5;
    const windowStart = new Date(Date.now() - WINDOW_MS);
   
    const limit = await RateLimiting.findOne({UniqueID: Phone, Action: "otp"});
    if(limit && limit.Timer >= windowStart && limit.Count >= MAX_REQUEST){
        throw new TooManyRequestsError("OTP limit excceded, please try again in 10 minutes", "TOO_MANY_REQUEST");
    }
    if(limit && limit.Timer >= windowStart && limit.Count < MAX_REQUEST){
        await RateLimiting.updateOne({_id: limit._id}, {$inc: {Count: 1}, $set: {Timer: new Date()}});
    }else{
        await RateLimiting.findOneAndUpdate({UniqueID: Phone, Action: "otp"}, {$set: {Count: 1, Timer: new Date()}}, {upsert: true, new: true});
    }

    const result = await sendOTP(cCode, Tel, code, IP, userAgentObject, Exp);
    res.status(200).json(result);
});