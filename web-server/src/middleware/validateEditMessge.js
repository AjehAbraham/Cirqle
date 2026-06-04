import {BadRequestError} from "../utils/AppError.js";
import mongoose from "mongoose";

export const validateMessage = (req, res, next) =>{
  const {messageId, convoId, message} = req.body;
  const user = req.user;
  
  if(!messageId || !convoId) throw new BadRequestError("Please select a message", "BAD_REQUEST_ERROR");
  const trimMessageId =  messageId.trim();
  const trimConvo = convoId.trim();
  
  if(typeof trimMessageId != "string" || typeof trimConvo != "string" ) throw new BadRequestError("Invalid selected types", "BAD_REQUEST_ERROR");
  if(!mongoose.Types.ObjectId.isValid(trimConvo) || mongoose.Types.ObjectId.isValid(trimMessageId)) throw new BadRequestError("Invalid selected length", "BAD_REQUEST_ERROR");
  if(!message) throw new BadRequestError("Please enter a new message", "BAD_REQUEST_ERROR");
  
  if(typeof message != 'string' || message.trim().length === 0) throw new BadRequestError("Please enter a message", "BAD_REQUEST_ERROR");
  req.messageId = trimMessageId;
  req.convoId = trimConvo;
  req.content = message;
  next();
}