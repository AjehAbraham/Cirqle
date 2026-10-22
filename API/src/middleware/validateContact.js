import { BadRequestError, ValidationError} from "../utils/AppError.js";


export const ValidateContact = (req, res, next) => {
const {route, fullName, firstName, lastName, cCode, phone } = req.body;
//console.log(req.body);

if(typeof route !== "string" || typeof fullName != "string" || typeof firstName != "string" || typeof lastName != "string" || 
  typeof phone != "string" || typeof cCode != "string") throw new BadRequestError("Invalid Name,Country code or phone number", "BAD_REQUEST_ERROR");

  if(route !== "edit" && route !== "save") throw new BadRequestError("Invalid request");
 
const cleanfirstName = firstName.replace(/[^a-zA-Z0-9 '-]/g, '').replace(/\s+/g, ' ').trim();
const cleanlastName = lastName.replace(/[^a-zA-Z0-9 '-]/g, '').replace(/\s+/g, ' ').trim();
const full_Name = `${cleanfirstName} ${cleanlastName}`;
req.body.firstName = cleanfirstName;
req.body.lastName = cleanlastName;
req.body.fullName = full_Name;;


const countryCOde = cCode.trim();
  const samples = ["+1", "+44", "+91", "+234", "+222", "+86", "+49", "+33", "+81", "+61"];
  if (!samples.includes(countryCOde)) {
    throw new ValidationError("Invalid country code or country code not supported", "COUNTRY_CODE_VALIDATION_ERROR");
  }
req.body.cCode = countryCOde; 


const Tel = phone.trim().replace(/\D/g, '');

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

const config = countryConfig[countryCOde] || { max: 12, strip: 0, format: [3,3,4] };

if (!/^[0-9]+$/.test(Tel)) {
  throw new ValidationError("Invalid phone number", "PHONE_VALIDATION_ERROR");
}
if (Tel.length < 7 || Tel.length > config.max) {
  throw new ValidationError(`Phone must be 7-${config.max} digits`, "PHONE_VALIDATION_ERROR");
}

let finalPhone = Tel;
if (config.strip && finalPhone.startsWith("0")) {
  finalPhone = finalPhone.slice(config.strip);
}

req.body.phone = finalPhone;

    next();
}