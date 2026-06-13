
import {BadRequestError} from "../utils/AppError.js";

export const validateMessage = (req, res, next) =>{
	const {conversationId, message, type} = req.body;
	if(typeof conversationId !== 'string' || typeof message !== 'string'|| typeof type !== 'string'){
	throw new BadRequestError("Invalid message request ", "BAD_REQUEST_ERROR");
	}
	const convoID = conversationId.trim();
	if(convoID.length < 5){
	throw new BadRequestError("Invalid conversation ID", "BAD_REQUEST_ERROR");
	}
	req.body.conversationId = convoID;
	const trimmedType = type.trim();
	const samples = ["text", "text/image", "video", "audio", "file", "system"];
	if(!samples.includes(trimmedType)){
		throw new BadRequestError("Invalid message type", "BAD_REQUEST_ERROR");
	}
	
	const msg = message.trim();
	if(msg.length <= 0){
		throw new BadRequestError("Message cannot be eemptt", "BAD_REQUEST_ERROR");
	}
	req.body.message = msg;
	next();
}