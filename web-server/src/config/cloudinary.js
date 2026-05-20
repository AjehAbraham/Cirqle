import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// UPLOAD IMAGE ONLY 
export const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "Uploads/images/",
    resource_type: "image",
    tags: ["profile", req.user.id],
    context: {
      userId: req.user.id,
      uploadedBy: req.user.role,
	  originalName: file.originalname
    },
	access_mode: "authenticated",
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1080, height: 1080, crop: 'limit' }]
  })
});

// UPLOAD VIDEO FILE
export const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "Uploads/videos/",
    resource_type: "video",
    tags: ["video", req.user.id],
	context: {
      userId: req.user.id,
      uploadedBy: req.user.role,
	  originalName: file.originalname
    },
	access_mode: "authenticated",
    allowed_formats: ['mp4', 'mov', 'avi', 'webm']
  })
});

// UPLOAD AUDIO FILE
export const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "Uploads/audio/",
    resource_type: "video", 
    tags: ["audio", req.user.id],
	context: {
      userId: req.user.id,
      uploadedBy: req.user.role,
	  originalName: file.originalname
    },
	access_mode: "authenticated",
    allowed_formats: ['mp3', 'wav', 'ogg', 'm4a']
  })
});

// UPLAOD DOCUMENT 
export const rawStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "Uploads/docs/",
    resource_type: "raw",
    tags: ["document", req.user.id],
	context: {
      userId: req.user.id,
      uploadedBy: req.user.role,
	  originalName: file.originalname
    },
	access_mode: "authenticated",
    allowed_formats: ['pdf', 'docx', 'xlsx', 'txt']
  })
});

export default cloudinary;