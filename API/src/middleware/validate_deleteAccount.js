import { BadRequestError, ValidationError } from "../utils/AppError.js";

export const validateDelete = (req, res, next) =>{
    const {phone} = req.body;
    if(typeof phone !== 'string') throw new BadRequestError("Invalid phone number");
    const tel = phone.trim();
    let cleanedPhone = tel.replace(/[^0-9+]/g, "");
    cleanedPhone = cleanedPhone.replace(/(?!^)\+/g, "");
    if(cleanedPhone.length < 9) throw new ValidationError("Invalid phone number length");
    req.body.phone = cleanedPhone;
    next();
}