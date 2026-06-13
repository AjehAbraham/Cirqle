
import {registerUser} from "../model/registerModel";
import {messageModel, conversationModel} from "../models/messageModel";
import {updateAbout} from "../models/AboutModel.js";
import {settings} from "../models/settings.js";

async function verifyConversationId(convoId, userId){
	const verify = await conversationModel.findOne({_id: convoId, 'Participants.UniqueID': userId});
	if(!verify) return {sucess: false};
	return {success: true, data: verify};
}

 async function fetchUpdated(convoId, LastmessageId, userId){
	const isMember = await verifyConversationId(convoId, userId);
	if(!isMember) return {success: false};
	
	const fetch = await messageModel.findOne({ConversationID: convoId, _id: {$gt: LastmessageId}});
	if(!fetch) return {success: false};
	return {success: true, data:  fetch};
 }
 
 async function AllConversation(userId){
	 const conversations = await conversationModel.find({'Participants.UniqueID': userId});
	 if(!conversations || conversations.length === 0) return {success: false, status: "No conversatiom found"};
	 
	 let user;
	 let profile;
     if(conversations.Participants.UniqueID !== userId && conversations.Type !== "group"){
	 user = await registerModel.find({_id: conversations.Participants.UniqueID});
	 profile = await updateAbout.find({UniqueID: consersatioms.Participants.UniqueID}).select("ImageUrl PublicID");
	 }
	 let Name;
	 let Type;
	 if(converstions.Type === "group"){
	  Type = "group";
	  name = conversations.Name;
      profile.ImageUrl = conversations.Avatar;  
	 }else{
		 Type = "dm";
	 }
	 return {
	 success: true,
	  data: {
	  userDetails: user,
	  profileDetails: profile,
	  lastMessage: conversations.LastMessage,
	  lastMessageDate: conversations.LastMessageAt,
	  name: Name || null,
	  type: Type
	 }
	 }
 }
 async function loadConversationMessages(convoId, userId){
	 const isMember = await verifyConversationId(convoId, userId});
	 if(!isMember) return {success: false};
	 
	const messages = await messagModel.find({ConversationID: convoId});
	if(!messages) return {success: false};
	let display;
	if(messages.DeletedForEveryone === true){
	messages.Type = "system";
	messages.Content = "Deleted for everyone";
	messages.Attactments = null;
	display = "everyone";
	}
	if(messages.DeletedFor === userId){//DELETED FOR HOLDS ARRAYS OF USER ID []
	 messages.Type = "system";
	 messages.Content = "Deleted for me";
	 messages.Attactments = null;
	 display = "me";
	 
	}
	return {success: true, data: messages, display};
	
 }
 
 async function getGeneralSettings(userId){
	const setting = await settings.findOne({UniqueID: userId}).sort({CreatedAt: -1}).select("ChatSettings PrivacySettings DisappearingMessage Notification BlockUsers Display");
 }
 async function getConversationSettings(convoId, userId){
	const isMember = await conversationModel.findOne({'Participants.UniqueID': userId, _id: convoId}).select("ChatSettings Notification");
	if(!isMemeber) return {success: false};
	return {success: true, data: isMember};
 }
 