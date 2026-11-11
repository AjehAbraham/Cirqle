import loadConversations from "../service/fetchCovo.js";
import {asyncHandler} from "../utils/asyncHandler.js";


const loadConvo = asyncHandler (async (req, res, next) => {
    const userID = req.user.id;
    const fetch = await loadConversations(userID);
    
    if(!fetch) return {success: false, data: []};
    return {success: true, data: fetch};
});
export default loadConvo;