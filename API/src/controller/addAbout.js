import cloudinary from "../config/cloudinary.js";
import { BadRequestError, InternalServerError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import addInfo from "../src/service/saveAbout.js";


export const addAbout = asyncHandler(async (req, res) => {
  const { name, about } = req.body;
  const UserAgent = req.headers["user-agent"] || "Unknown";
  const IP = req.headers["x-forwarded-for"]?.split(",")[0].trim();
  const file = req.file;
  
  const hasName = name && name.trim().length >= 3;
  const hasAbout = about && about.trim().length >=3;
  const hasImage = !!file;
  
  if (!hasName && !hasAbout && !hasImage) {
    throw new BadRequestError("Please provide at least a name, about, or image");
  }
  
  const imageUrl = hasImage ? file.secure_url : null;
  const publicId = hasImage ? file.filename || file.public_id : null;
  
   const add_details = await addInfo(
   req.user.id, 
   req.user.cCode, 
   req.user.phone,
   name || null, 
   about || null, 
   imageUrl, 
   publicId, 
   IP, 
   UserAgent);
   
    if(!add_details.success){
		throw new InternalServerError("We are unabale to update your profile info, please try again", "INTERNAL_SERVER_ERROR");
	}

  res.status(201).json({ success: true, result: add_details});
});