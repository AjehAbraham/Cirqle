
import {BadRequestError, ValidationError} from "../utils/AppError.js";


const validate = (req, res, next) =>{
  const user = req.user.id;
  const {convoId, lastMessageId} = req.body;
  
  if(!convoId && lastMessageId) throw new BadRequestError("We cannot update your messages, please reload", "BAD_REQUEST_ERROR");
  if(!typeof convoId && lastMessageId === "string") throw new BadRequestError("Invalid update data", "BAD_REQUEST_ERROR");
  req.id = convoId;
  req.messageId = lastMessageId;
  
  next();	
}