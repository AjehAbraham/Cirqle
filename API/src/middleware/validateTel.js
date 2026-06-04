import { BadRequestError, ValidationError } from "../src/utils/AppError.js";

export const ValidateTel = (req, res, next) => {
  const { countryCode, Tel } = req.body;

  if (typeof countryCode !== 'string' || typeof Tel !== 'string') {
    throw new BadRequestError("Invalid phone number or Country code", "BAD_REQUEST_ERROR");
  }

  const cCode = countryCode.trim();
  const samples = ["+1", "+222", "+91", "+234"];
  if (!samples.includes(cCode)) {
    throw new ValidationError("Invalid country code or country code not supported", "CCODE_VALIDATION_ERROR");
  }
  req.body.CountryCode = cCode; 

  const Phone = Tel.trim();
  const pattern = /^[0-9]+$/;
  if (!pattern.test(Phone)) {
    throw new ValidationError("Invalid phone number", "PHONE_VALIDATION_ERROR");
  }
  if (Phone.length < 8 || Phone.length > 12) {
    throw new ValidationError("Phone number must be between 8-12 digits long", "PHONE_VALIDATION_ERROR");
  }
  req.body.Tel = Phone;

  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim()
           || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  req.body.ip = ip;
  req.body.UserAgent = userAgent;

  if (req.body.otp) {
    const otp = req.body.otp.toString().trim();
    const regex = /^[0-9]{6}$/;
    if (!regex.test(otp)) {
      throw new ValidationError("Invalid OTP length. OTP must be 6 digits", "OTP_VALIDATION_ERROR");
    }
    req.body.otp = otp; 
  }

  next();
};