import express from "express";
import {authenticate} from "../src/middleware/auth.js";
import {validateMessage} from "../src/middleware/validateMessage";
import {sendMessage} from "../src/controller/sendMessage.js";
import multer from "multer";
import {uploadSingleImage, uploadSingleVideo, uploadSingleRaw} from "../src/middleware/upload.js";

const messageRouter = express.Router();

messageRouter.post("/send/message", authenticate, 
multer().none(),
(req, res, next) =>{
	let uploadMiddleware;
	switch(req.body.type){
		case "text/image":
		case "image":
		uploadMiddleware = uploadSingleImage;
		break;
		case "video":
		uploadMiddleware = uploadSingleVideo;
		break;
		case "audio":
		case "file":
		case "raw":
		uploadMiddleware = uploadSingleRaw;
		break;
		default: 
		return next();
	}
	uploadMiddleware(req, res, next);
}, validateMessage, sendMessage);
export messageRouter;