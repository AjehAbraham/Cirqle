import Load from "../service/fetchConvo.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {NotFoundError} from "../utils/AppError.js";

const loadConvo = asyncHandler (async (req, res, next) => {
    const userID = req.user.id;
    const fetch = await Load(userID);
    
    if(!fetch) return {success: false};
    return {success: true, data: fetch};
});
export default loadConvo;