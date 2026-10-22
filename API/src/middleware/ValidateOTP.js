import { request } from "express";
import { BadRequestError, ValidationError } from "../utils/AppError.js";

export const ValidateOTP = (req, res, next) => {
  const {countryCode, Tel, otp, session} = req.body;

  if (typeof countryCode !== 'string' || typeof Tel !== 'string' ||  typeof otp !== "string" || typeof session != "string") {
    throw new BadRequestError("Invalid request data/data types", "BAD_REQUEST_ERROR");
  }
  
  const cCode = countryCode.trim();
  const samples = ["+1", "+44", "+91", "+234", "+222", "+86", "+49", "+33", "+81", "+61"];
  if (!samples.includes(cCode)) {
    throw new ValidationError("Invalid country code or country code not supported", "CODE_VALIDATION_ERROR");
  }
  req.body.countryCode = cCode; 

  const Phone = Tel.trim().replace(/\D/g, '');
  const pattern = /^[0-9]+$/;
  if (!pattern.test(Phone)) {
    throw new ValidationError("Invalid phone number", "PHONE_VALIDATION_ERROR");
  }
  if (Phone.length < 7 || Phone.length > 12) {
    throw new ValidationError("Phone number must be between 7-12 digits long", "PHONE_VALIDATION_ERROR");
  }
  req.body.Tel = Phone;

const OTP = req.body.otp.trim().replace(/\D/g, '');
if(OTP.length < 5 || OTP.length > 6) throw new BadRequestError("Invalid OTP length", "BAD_REQUEST_ERROR");
req.body.otp = OTP;

/* const code = Code.trim();
 const codeSamples = ["NG", "US", "GB", "ZA", "AU", "IN", "CA", "GH", "FR"];
  if(!codeSamples.includes(code)){
    throw new ValidationError("Invalid Code", "CODE_VALIDATION_ERROR");
  }
req.body.Code = code;*/

const sessionID = session.trim();
if(sessionID.length <= 10) throw new ValidationError("session not valid", "SESSION_VALIDATION_ERROR");
req.body.session = sessionID;

  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim()
           || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  req.body.ip = ip;
  req.body.UserAgent = userAgent;
  next();
};