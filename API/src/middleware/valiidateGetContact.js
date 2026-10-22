import { BadRequestError} from "../utils/AppError.js";

 export const validateGetContact = (req, res, next) => {
  const {id} = req.body;
  if(typeof id !== "string") throw new BadRequestError("Invalid user identifier");
  const ID = id.trim();
  req.body.id = ID;
    next();
 }