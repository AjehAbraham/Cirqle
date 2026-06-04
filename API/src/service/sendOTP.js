import crypto from "crypto";
import {ConflictError, InternalServerError} from "../src/utils/AppError.js";
import {saveOTP} from "../src/models/OTPmodel.js";
import bcrypt from "bcrypt";
import {sendSMS} from "../src/service/sendSMS.js";



export async function sendOTP(cCode, Tel, IP, UserAgent, Exp){

	   const OTP = crypto.randomInt(100000, 1000000).toString();
       const hash = await bcrypt.hash(OTP, 12);
       const expireAt = new Date(Date.now() + 5*60*1000);
	   
	    const save = await saveOTP.create({
			CountryCode: cCode, 
			Phone: Tel, 
			OTP: OTP, 
			Hash: hash, 
			expireAt: expireAt,
			Exp: false,
			IP: IP, 
		 UserAgent: UserAgent });
		
		try{
			if(save){
				const Number = cCode + Tel;
				const message = "Your OTP is: " + OTP + ".It expires in 5 minutes.Please do not share this code.";
				
				const result = await sendSMS({
				to: Number, message });
				
			if(!result.success){
			    await saveOTP.updateOne({_id: save._id}, {$set: {Exp: true, Status: 2}});
				throw new Error("Failed to send SMS");
		
			}
			return {success: true, message: "OTP has been sent"};
			}
			
		}catch(err){
			throw err;
		}
}
