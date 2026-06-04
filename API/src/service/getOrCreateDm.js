import {conversationModel} from "../src/models/messageModel.js";


export async function getOrCreateDm(SenderId, receiverId){
	
	let convo = await conversationModel.findOne({
		Type: "dm",
		Participant.UniqueID: {$all: [senderId, receiverId]},
		 $expr: { $eq: [{ $size: "$Participants" }, 2] }
	});
	if(!convo){
		convo = await conversationModel.create({
			Type: "dm",
			Participant: [
			{UniqueID: SenderId, JoinedAt: Date.now()},
				{UniqueID: receiverId, JoinedAt: Date.now()}
			]
		});
	}
	return convo;
}
