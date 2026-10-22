import { ValidationError, BadRequestError } from "../utils/AppError.js";

export const validateDeleteContact = (req, res, next) =>{
    const {id, cCode, phone} = req.body;
    if(typeof id !== 'string' || typeof cCode !== 'string' || typeof phone !== 'string') throw new BadRequestError("Invalid request credentials");
    const ID = id.trim();
    req.body.id = ID;
    const CountryCode = cCode.trim();
  const samples = ["+1", "+44", "+91", "+234", "+222", "+86", "+49", "+33", "+81", "+61"];
  if (!samples.includes(CountryCode)) {
    throw new ValidationError("Invalid country code or country code not supported", "COUNTRY_CODE_VALIDATION_ERROR");
  }
    const Phone = phone.trim().replace(/\D/g, '');
    
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

const config = countryConfig[CountryCode] || { max: 12, strip: 0, format: [3,3,4] };

if (!/^[0-9]+$/.test(Phone)) {
  throw new ValidationError("Invalid phone number", "PHONE_VALIDATION_ERROR");
}
if (Phone.length < 7 || Phone.length > config.max) {
  throw new ValidationError(`Phone must be 7-${config.max} digits`, "PHONE_VALIDATION_ERROR");
}

let finalPhone = Phone;
if (config.strip && finalPhone.startsWith("0")) {
  finalPhone = finalPhone.slice(config.strip);
}
req.body.phone = finalPhone;

    next();
}