
import { uploadSingleImage, uploadSingleVideo, uploadSingleRaw } from "../middleware/upload.js"; 
import { UnauthorizedError, ForbiddenError, InternalServerError, BadRequestError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getOrCreateDm, fetchUser, verifyConversationId, saveMessage } from "../service/saveMessage.js";
import { getIO } from "../../socket.js"; 
import { registerModel } from "../models/registerModel.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user.id;
  let { conversationId, receiverId, type, message, groupId, RuserId } = req.body;
  
  
  if (!conversationId && receiverId) {
    const convo = await getOrCreateDm(senderId, receiverId);
    if (!convo.success) throw new BadRequestError("Receiver not found", "BAD_REQUEST_ERROR");
    conversationId = convo.data._id;
  }
  
  
  const isMember = await verifyConversationId(conversationId, senderId); // fixed typo
  if (!isMember.success) {
    throw new ForbiddenError(`You cannot send message to this ${isMember.data?.Type || 'conversation'}`, "FORBIDDEN_ERROR");
  }
  const convoType = isMember.data.Type;
  
  
  let attachment;
  const samples = ["text/image", "image", "video", "audio", "file"];
  
  if (samples.includes(type)) {
    if (!req.file) throw new BadRequestError("File is missing", "BAD_REQUEST_ERROR");
    
    if (type === "text/image" || type === "image") await uploadSingleImage(req, res);
    else if (type === "video") await uploadSingleVideo(req, res);
    else if (type === "audio" || type === "file") await uploadSingleRaw(req, res);
    
    attachment = {
      url: req.file.secure_url,
      type: req.file.mimetype,
      size: req.file.size,
      name: req.file.originalname
    };
  }
  
  
  let ReplyTo = null;
  if (RuserId) {
    const replyUser = await fetchUser(RuserId); 
    ReplyTo = replyUser.success ? replyUser.data._id : null;
  }
	
  const send = await saveMessage(conversationId, senderId, type, message, attachment, ReplyTo, groupId);
  if (!send.success) {
    throw new InternalServerError("Fail to send message, please retry again", "INTERNAL_SERVER_ERROR");
  }
  
  
  const sender = await registerModel.findById(senderId).select("CountryCode Phone Name");
  

  const io = getIO();
  io.to(conversationId).emit("new_message", { // was "message: new"
    _id: send.data._id,
    convoId: conversationId,
    senderId,
    type,
    content: message,
    attachment,
    replyTo: ReplyTo,
    groupId: groupId || null,
    createdAt: send.data.CreatedAt,
    sender: {
      userId: sender._id,
      cCode: sender.CountryCode,
      phone: sender.Phone,
      name: sender.Name || null,
      type: convoType
    }
  });
  
  
  isMember.data.Participants.forEach(p => {
    io.to(p.UniqueID.toString()).emit("convo_updated", {
      convoId: conversationId,
      LastMessageAt: send.data.CreatedAt,
      lastMessage: type === "text" ? message : type
    });
  });
  
  res.status(201).json({ 
    success: true, 
    conversationId, 
    messageId: send.data._id 
  });
});        