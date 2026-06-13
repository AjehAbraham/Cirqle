import {reset} from "../service/resetSettings.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {InternalServerError} from "../utils/AppError.js";

export const resetSetting = asyncHandler (async (req, res, next) => {
	const userId = req.user.id;
	const update = await reset(userId);
	if(!update.success) throw new InternalServerError("Fail to reset profile settings, please try again", "INTERNAL_SERVER_ERROR");
	res.status(201).json({success: true, data: update.data});
});