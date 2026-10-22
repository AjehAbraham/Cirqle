import { BadRequestError, ForbiddenError, ValidationError } from "../utils/AppError.js";

 const ValidateSessionToken = (req, res, next) => {
  const { data } = req.body;
  const cCode = data?.cCode || req.body?.cCode;
  const phone = data?.phone || req.body?.phone;
     if(!req.cookies?.access_token) throw new BadRequestError("No credentials", "BAD_REQUEST_ERROR");
     next();
 }
 export default ValidateSessionToken;