import {reset} from "../src/service/resetSettings.js";
import {asyncHandler} from "../src/utils/asyncHandler.js";
import {InternalServerError} from "../src/utils/AppError.js";

export const restSetting = asyncHandler (async (req, res, next) => {
	const userId = req.user.id;
	const update = await reset(userId);
	if(!update.success) throw new InternalServerError("Fail to reset profile settings, please try again", "INTERNAL_SERVER_ERROR");
	res.status(201).json({success: true, data: update.data});
});