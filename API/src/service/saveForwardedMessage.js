import {conversationModel, messageModel} from "../src/models/messageModel.js";


export async function original(messageId){
	const msg = await messageModel.findById(messageId);
	if(!msg) return {success: false};
	return {success: true, data: msg};
}
export async function verifyConversationId(convoID, userID){
	const verify = await conversationModel.findOne({_id: convoID, 'Participants.UniqueID': userID});
	if(!verify) throw new ForbiddenError("Not authorized for this conversation", "FORBIDDEN_ERROR");
	return verify;
}

async function saveForwarded(conversationId, messageId, senderId, type, content, attachement, forwarded, originalId ){
	const msg = await messageModel.create({
		ConversationID: conversationId,
		SenderID: senderId,
		Type: type,
		Content: content,
		Attachments: attachement,
		Status: "sent",
		DeliveredTo: [],
		SeenBy: [],
		IsForwarded: true,
		ForwardedFrom: forwarded,
		ForwardCount: 0
	});
	
       await Promise.all({
		   messageModel.updateOne({_id: originalId}, {$inc: {ForwardCount: 1}}),
		   conversationModel.updateOne({_id: conversationId},
		   {$set: {LastMessage: msg._id, LastMessageAt: new Date() }});
	   )};
	   
       return {conversationID: conversationId, messageId: msg._id};
 }
