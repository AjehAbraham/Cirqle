import { asyncHandler } from "../utils/asyncHandler.js";
import { getProfile } from "../service/getProfile.js";

export const viewProfile = asyncHandler (async (req, res, next) =>{
    const userID = req.user.id;
    const {id} = req.body;
    const process = await getProfile(userID, id);
    console.log(process);
    res.status(200).json(process);
});