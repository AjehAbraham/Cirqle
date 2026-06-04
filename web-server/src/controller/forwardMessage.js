import {BadRequestError, ForbiddenError, InternalServerError} from "../src/utils/AppError.js";
import {asyncHandler} from "../src/utils/asyncHandler.js";
import {original, verifyConversationId, saveForwarded} from "../src/service/saveForwardedMessage.js";
import {getOrCreateDm, fetchUser} from "../src/service/saveMessage.js";

export const forwardMessage = asyncHandler (async (req, res, next) =>  {
	let {messageId, conversationId} = req.body;
	const senderId = req.user.id;
	
	 if(!messageId) throw new BadRequestError("No message selected", "BAD_REQUEST_ERROR");
	 if(!Array.isArray(conversationId) || conversationId.length === 0){
		 throw new BadRequestError("Please select recipient(s) to forward message", "BAD_REQUEST_ERROR");
	 }
	 if(conversationId.length > 20) throw new ForbiddenError("You cannot forward message to more than 20 chats at once", "FORBIDDEN_ERROR");
	 
	const originalRes = await original(messageId);
	if(!originalRes.success) throw new ForbiddenError("The message you are trying to forward is either invalid,deleted or does not exist", "FORBIDDEN_ERROR");
	 const originalMsg = originalRes.data; 
	 
	 await Promise.all(conversationId.map(Id => verifyConversationId(Id, senderId)));

	 const forwardedData =  {
		MessageID: originalMsg._id,
	 		 OriginalSenderID: originalMsg.SenderID,
		OriginalConversationID: originalMsg.ConversationID
	 }
	 
	 const results = await Promise.allSettled(conversationId.map(convoId => saveForwarded(convoId, messageId, senderId, originalMsg.Type,  originalMsg.Content, originalMsg.Attachments, forwardedData, originalMsg._id)));
	 
	 const successful = results.filter(r => r.status === "fulfilled").map(r => r.value);
     const failed = results.filter(r => r.status === "rejected").map(r => r.reason.message);

  if (successful.length === 0) {
    throw new InternalServerError("Failed to forward message to any conversation", "INTERNAL_SERVER_ERROR");
  }

  res.status(201).json({
    success: true, 
    forwardedTo: successful.length,
    failedTo: failed.length,
    messageIds: successful.map(s => s.messageId),
    errors: failed
  });
  
});