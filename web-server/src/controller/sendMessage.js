
import {uploadSinleImage, uploadSingleVideo, uploadSingleRaw} from "../src/middleware/upload.js";
import {UnauthorizeError, ForbiddenError, InternalServerError, BadRequestError} from "../src/utils/AppError.js";
import {asyncHandler} from "../src/asyncHandler.js";
import {getOrCreateDm, fetchUser, verifyConversationId, saveMessage} from "../src/service/saveMessage.js";
import {}

export const sendMessage = asyncHandler (async (req, res, next) =>{
	const senderId = req.user.id;
	let {conversationId, receiverId, type, message} = req.body;
	let convoType;
	
	if(!conversationId && receiverId){
		const convo = await getOrCreateDm(senderId, receiverId);
		conversationId = convo.data._id;
	}
	const isMemeber = await verifyConversationId(conversationId, senderId);
	convoType = isMemeber.data.Type;
	
	if(!isMemeber.success){
		throw new ForbiddenError(`You cannot send message to this ${isMember.data.Type}`, "FORBIDDEN_ERROR");
	}
	
	const {groupId} = req.body;//CREATE AND SEND GROUP ID FOR MULTIPE IMAGE AND VIDEOS SELECTED//
    let attachment;
	const samples = ["text/image", "image", "video", "audio", "file"];
	 if(samples.includes(type)){
		 
		 if(!req.file) throw new BadRequestError("File is missing", "BAD_REQUEST_ERROR");
		 if(type === "text/image" || type === "image")  {
		 const upload = await uploadSingleImage(req, res);
		 }
		 if(type === "video"){
		 const upload = await uploadSingleVideo(req, res);
		 }
	 if(type === "audio" || type === "file"){
		 const upload = await uploadSingleRaw(req, res);
	 }
		 attachment = {
			 url: req.file.secure_url,
			 type: req.file.mimetype,
			 size: req.file.size,
			 name: req.file.originalname
		 };
	 }
	
	let ReplyTo;
	if(req.body.RuserId){
	  const fetch = await fetchUser(req.RuserId);
	  if(fetch){
		  ReplyTo = fetch._id;
	  }else{
		  ReplyTo = null;
	  }
	}

	const send = await saveMessage(conversationId, senderId, type, msg, attachment, ReplyTo, groupId);
	if(!send){
		throw new InternalServerError("Fail to send message, please retry again", "INTERNAL_SERVER_ERROR");
	}
	const sender = await registerModel.findById({_id: req.user.id}).select("CountryCode Phone Name");
	getIO().to(convoId).emit("message: new",
	{
	 data: {
		userId: sender._id,
		cCode: sender.CountryCode,
		phone: sender.Phone,
		name: sender.Name || null,
		type: convoType
	 }	
	}
	);
	res.status(201).json({success: true, conversationId, messageId});
});

                      