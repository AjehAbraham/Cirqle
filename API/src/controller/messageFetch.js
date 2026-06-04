
import {ForbiddenError, UnauthorizeError} from "../src/utils/AppError.js";
import {asyncHandler} from "../src/utils/asyncHandler.js";

const fetchMessage = asyncHandler (async (req, res, next) => {
	const {convoId, messageId} = req.body;
	
});