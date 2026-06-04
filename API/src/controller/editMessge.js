import {asyncHandler} from "../utils/asyncHandler.js";
import {UnauthorizedError, ForbiddenError} from "../utils/AppError.js";
import saveEdited from "../service/saveEdited.js";

 const editMessage = asyncHandler (async (req, res, next) => {
  const {messageId, convoId, content}  = req;
  const user = req.user.id;
  const result = await saveEdited(convoId, messageId, user, message);
  if(!result.success) return res.status(400).json({success: false});
  
  return res.status(200).json({success: true, data: res.data});
  
});
export default editMessage;