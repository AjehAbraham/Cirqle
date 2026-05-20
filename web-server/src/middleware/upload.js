import multer from "multer";
import {imageStorage, videoStorage, audioStorage, rawStorage} from "../src/config/cloudinary.js";


//SINGLE UPLOAD //
export const uploadSingleImage = multer({storage: imageStorage}).single("image");
export const uploadSingleVideo = multer({storage: videoStorage}).single("image");
export const uploadSingleAudio = multer({storage: audioStorage}).single("image");
export const uploadSingleRaw = multer({storage: rawStorage}).single("image");


//UPLOAD MULTIPLE
export const uploadMultipleImage = multer({storage: imageStorage}).array("images", 10);
export const uploadMultipleVideo = multer({storage: videoStorage}).array("images", 5);
export const uploadMultipleAudio = multer({storage: audioStorage}).array("images", 10);
export const uploadMultipleRaw = multer({storage: rawStorage}).array("images", 10);