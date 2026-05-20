
import {conversationModel, messageModel} from "../src/models/messageModel.js";
import {registerUser} from "../src/models/registerModel.js";


export async function getOrCreateDm(senderId, receiverId){
	const isRegistered = await fetchUser(receiverId);
	if(!isRegistered.success) return {success: false};
	
	
	let convo = await conversationModel.findOne({
		Type: "dm",
		Participants.UniqueID: {$all: [senderId, receiverId]},
		 $expr: { $eq: [{ $size: "$Participants" }, 2] }
	});
	if(!convo){
		convo = await conversationModel.create({
			Type: "dm",
			Participants: [
			{UniqueID: senderId, JoinedAt: Date.now()},
				{UniqueID: receiverId, JoinedAt: Date.now()}
			]
		});
	}
	return convo;
}

async function fetchUser(userId){
	const fetch = await registerUser.findOne({_id: userId});
	if(!fetch) return {success: false};
	return {success: true};
}
export async function verifyConversationId(convoID, userID){
	const verify = await conversationModel.findOne({_id: convoID, 'Participants.UniqueID': userID});
	if(!verify){
		return {success: false, data: verify};
	}
	return {success: true, data: verify};
}
 async function saveMessage(conversationId, senderId, type, message, attachement, replyTo, groupId){
		 const msg = await messageModel.create({
			ConversationID: conversationId,
			SenderID: senderId,
			Type: type,
			Content: type.includes("text")? message : undefined,
			Attachments: attachement ? [attachement]: [],
			Status: "sent",
			DeliveredTo: [],
			SeenBy: [],
			GroupID: groupId || null,
			ReplyTo: replyTo
		 });
       if(!msg) return {success: false};
	   await conversationModel.updateOne({_id: conversationId},
		   {$set: {LastMessage: msg._id, LastMessageAt: msg.CreatedAt}});
		   
       return {success: true, conversationId, messageId: msg._id};
 }
