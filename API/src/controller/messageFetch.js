
import {ForbiddenError, UnauthorizeError} from "../utils/AppError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const fetchMessage = asyncHandler (async (req, res, next) => {
	const {convoId, messageId} = req.body;
	
});