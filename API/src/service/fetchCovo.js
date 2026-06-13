import {messageModel, conversationModel} from "../models/messageModel.js";


async function Load(userID){
    const result = await conversationModel.find(
    {
        'Participants.UniqueID': userID
    }).sort({LastMessageAt: -1});
    if(!result) return {success: false, data: null};
    const msg = await messageModel.findOne({_id: result.LastMessage});
    if(!msg) return {success: false};
    
    return {success: true, data: msg, convo: result};
}
export default Load;