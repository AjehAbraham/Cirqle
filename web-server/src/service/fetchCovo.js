import {converstionModel} from "../models/messageModel.js";


async function Load(userID){
    const result = await conversationModel.find(
    {
        'Participants.UniqueID': userID
    }).sort({LastMessageAt: -1});
    if(!result) return {success: false, data: null};
    return {success: true, data: result};
}
export default load;