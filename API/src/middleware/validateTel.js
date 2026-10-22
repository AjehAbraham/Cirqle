import { BadRequestError, ValidationError } from "../utils/AppError.js";

export const ValidateTel = (req, res, next) => {
  const { countryCode, Tel, Code } = req.body;

  if (typeof countryCode !== 'string' || typeof Tel !== 'string' || typeof Code !== "string") {
    throw new BadRequestError("Invalid phone number or Country code", "BAD_REQUEST_ERROR");
  }

  const cCode = countryCode.trim();
  const samples = ["+1", "+44", "+91", "+234", "+222", "+86", "+49", "+33", "+81", "+61"];
  if (!samples.includes(cCode)) {
    throw new ValidationError("Invalid country code or country code not supported", "COUNTRY_CODE_VALIDATION_ERROR");
  }
  req.body.countryCode = cCode; 

const tel = Tel.trim().replace(/\D/g, '');

const countryConfig = {
  "+234": { max: 11, strip: 1, format: [3,4,4] },
  "+254": { max: 10, strip: 1, format: [3,3,4] },
  "+233": { max: 10, strip: 1, format: [3,3,4] },
  "+1": { max: 10, strip: 0, format: [3,3,4] },
  "+91": { max: 10, strip: 0, format: [5,5] },
  "+33": { max: 9, strip: 1, format: [1,2,2,2,2] },
  "+61": { max: 10, strip: 1, format: [4,3,3] },
  "+27": { max: 10, strip: 1, format: [3,3,4] },
  "+44": { max: 11, strip: 1, format: [4,3,4] },
}

const config = countryConfig[cCode] || { max: 12, strip: 0, format: [3,3,4] };

if (!/^[0-9]+$/.test(tel)) {
  throw new ValidationError("Invalid phone number", "PHONE_VALIDATION_ERROR");
}
if (tel.length < 7 || tel.length > config.max) {
  throw new ValidationError(`Phone must be 7-${config.max} digits`, "PHONE_VALIDATION_ERROR");
}

let finalPhone = tel;
if (config.strip && finalPhone.startsWith("0")) {
  finalPhone = finalPhone.slice(config.strip);
}
req.body.Tel = finalPhone;


 const code = Code.trim();
 const codeSamples = ["NG", "US", "GB", "ZA", "AU", "IN", "CA", "GH", "FR"];
  if(!codeSamples.includes(code)){
    throw new ValidationError("Inavlid Code", "CODE_VALIDATION_ERROR");
  }
req.body.Code = code;

  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim()
           || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  req.body.ip = ip;
  req.body.UserAgent = userAgent;
  next();
};