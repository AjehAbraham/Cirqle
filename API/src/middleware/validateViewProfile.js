import { BadRequestError, ValidationError } from "../utils/AppError.js";

export const validateProfile = (req, res, next) => {
const {id} = req.body;
   if(typeof id !== 'string') throw new BadRequestError("Invalid User");
   const ID = id.trim();
   req.body.id = ID;
   next();
}