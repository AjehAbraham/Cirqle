import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: `Cirqle/profiles/${req.user.id}/images`,
    public_id: `avatar`,
    resource_type: "image",
    overwrite: true,
    invalidate: true,
    tags: ["profile", req.user.id],
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "thumb", gravity: "face" }]
  })
});

export const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: `Cirqle/chats/${req.chatID}/images`,
    resource_type: "image",
    tags: ["chat_image", req.user.id, req.chatID],
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 1920, height: 1920, crop: "limit", quality: "auto" }]
  })
});

export const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: `Cirqle/chats/${req.chatID}/videos`,
    resource_type: "video",
    tags: ["video", req.user.id, req.chatID],
    allowed_formats: ["mp4", "mov", "avi", "webm"]
  })
});

export const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: `Cirqle/chats/${req.chatID}/audio`,
    resource_type: "video",
    tags: ["audio", req.user.id, req.chatID],
    allowed_formats: ["mp3", "wav", "ogg", "m4a"]
  })
});

export const rawStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: `Cirqle/chats/${req.chatID}/docs`,
    resource_type: "raw",
    tags: ["document", req.user.id, req.chatID],
    allowed_formats: ["pdf", "docx", "xlsx", "txt"]
  })
});

export default cloudinary;