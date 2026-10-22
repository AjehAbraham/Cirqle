import { OTPSessionManager } from "../models/OTPmodel.js";

export default async function ValidateSession(countryCode, Tel, session){

    const phone = `${countryCode}${Tel}`;
    const MAX_TIME = new Date(Date.now() - 30*60*1000);
    const verify = await OTPSessionManager.findOne({Phone: phone, SessionID: session, createdAt: {$gte: MAX_TIME}});
    if(!verify) return {success: false, data:{message: "Invalid Session or cannot be found"}};
    if(verify.Exp) return {success: false, data:{message: "OTP session has expired"}};
    if(verify.SessionID !== session) return {success: false, data: {message: "Invalid session"}};
    return {success: true, data: {message: "valid session"}};
}