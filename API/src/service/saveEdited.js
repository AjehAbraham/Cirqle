import {messageModel, conversationModel} from "../models/messageModel.js"; 


 async function verifyConversation(convoId, userId){
     const verify = await conversationModel.findOne({_id: convoId, 'Participants.UniqueID': userId});
     if(!verify) return {success: false};
     return {success: true, data: verify};
 }

async function saveEdited(convoId, messageId, userId, content){
    const isMember = await verifyConversation(convoId, userId);
    if(!isMember.success) return {success: false};
    const msg = await messageModel.findOne({_id: messageId, SenderID: userId});
    if(!msg) return {success: false};
    
    if(msg.Content === content) return {success: true, data: msg, change: false};
    const EDIT_WINDOW = 15 * 60 * 1000;
    const update = await messageModel.findOneAndUpdate(
    {_id: messageId,
    SenderID: userId,
    CreatedAt: {$gte: new Date(Date.now() - EDIT_WINDOW)},
    Type: {$in: ["text", "text/image"]},
    Content: {$nin: [null, ""]}        
    },
    {
    $set:  { Edited: true, Content: content, EditedAt: new Date()},
     $inc: {EditCount: 1}, 
    $push: {
         
             EditHistory: { 
                 $each: [{OldContent: msg.Content, EditedAt: new Date()}],
             $slice: -50
         }
        
    }
        
    },  {new: true}
    );
    if(!update) return {success: false};
    return {success: true, data: update, change: true};
}
          
export default saveEdited;