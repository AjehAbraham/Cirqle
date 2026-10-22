import crypto from "crypto";
import { InternalServerError } from "../utils/AppError.js";
import { saveOTP, OTPSessionManager } from "../models/OTPmodel.js";
import { RateLimiting } from "../models/RateLimiting.js";
import bcrypt from "bcrypt";

export async function sendOTP(cCode, Tel, code, IP, UserAgent, Exp){
    const OTP = crypto.randomInt(100000, 1000000).toString();
    const hash = await bcrypt.hash(OTP, 12);
    const expireAt = new Date(Date.now() + 10*60*1000);
    const my_number = `${cCode}${Tel}`;
    const sessionId = crypto.randomBytes(32).toString('hex');
    
    const save = await saveOTP.create({
        CountryCode: cCode, 
        Code: code,
        Phone: Tel, 
        OTP: OTP,
        Hash: hash,
        expireAt: expireAt,
        Exp: false,
        IP: IP, 
        UserAgent: UserAgent 
    });
         
    const session = await OTPSessionManager.create({
        Phone: my_number,
        SessionID: sessionId,
    });

    try{
        if(save && session){
            /*const Number = cCode + Tel;
            const message = "Your OTP is: " + OTP + ".It expires in 10 minutes.Please do not share this code.";
            console.log("sending sms to " , Number);
            const result = await sendSMS({
                to: Number, message 
            });
            console.log("termi result:", result);
            if(!result.success){
                await saveOTP.updateOne({_id: save._id}, {$set: {Exp: true, Status: 2}});
                throw new InternalServerError(result.data?.message || result.error || "Failed to send SMS"); 
            }*/

            //FOR TESTING PURPOSES REMOVE SEND SMS
            return {
                success: true, 
                data: {
                    len: OTP.length, 
                    session: sessionId, 
                    message: "OTP has been sent", 
                    date: new Date()
                }
            };
        }
    }catch(err){
        throw err;
    }
}