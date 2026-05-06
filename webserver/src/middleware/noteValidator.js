import { pushNote } from "../controllers/noteController.js";
import {BadRequestError} from "../utils/AppError.js";


export const  ValidateNote = (req, res, next) => {
    const {title, content} = req.body;
    if(typeof title !== 'string'){
        throw new BadRequestError("Title must be string", "INVALID_TYPE");
    }
    const trimmedTitle = title.trim();
    if(trimmedTitle.length <= 0){
        throw new BadRequestError("Title cannot be empty", "EMPTY_FILED");
    }
    if(trimmedTitle.length <= 3){
        throw new BadRequestError("Title must be at least 4 charcters in length", "STRING_TOO_SHORT");
    }
    const regex = /^[a-zA-Z0-9_\s]+$/;
    if(!regex.test(trimmedTitle)){
        throw new BadRequestError("Title must be alphabetical,numberic, or contains underscore only");
    }
    if(trimmedTitle.length >= 30){
        throw new BadRequestError("Title cannot be greater than 30 characters");
    }

  if(typeof content !== 'string'){
    throw new BadRequestError("Content contains invalid inputs", "INVALID_INPUT");
  }
   const conRegex = /^[a-zA-Z0-9_\s]+$/;
   if(!conRegex.test(content)){
    throw new BadRequestError("Content must contain valid characters", "INVALID_TYPE");
   }
   req.body.title = trimmedTitle;
   req.body.content = content;
   pushNote();
    next();
}