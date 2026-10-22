import multer from "multer";
import {profileStorage, imageStorage, videoStorage, audioStorage, rawStorage} from "../config/cloudinary.js";

export const uploadSingleProfileImage = multer({storage: profileStorage}).single("avatar");
export const uploadSingleImage = multer({storage: imageStorage}).single("image");
export const uploadSingleVideo = multer({storage: videoStorage}).single("video");
export const uploadSingleAudio = multer({storage: audioStorage}).single("audio");
export const uploadSingleRaw = multer({storage: rawStorage}).single("document");

export const uploadMultipleImage = multer({storage: imageStorage}).array("images", 10);
export const uploadMultipleVideo = multer({storage: videoStorage}).array("videos", 5);
export const uploadMultipleAudio = multer({storage: audioStorage}).array("audios", 10);
export const uploadMultipleRaw = multer({storage: rawStorage}).array("documents", 10);