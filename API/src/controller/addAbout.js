import cloudinary from "../config/cloudinary.js";
import { BadRequestError, InternalServerError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import addInfo from "../service/saveAbout.js";

export const addAbout = asyncHandler(async (req, res) => {
  const { name, bio } = req.body;
  const { browser, os, device, raw } = req.parsedUA || {};
  const userAgentObject = { browser, os, device, raw }; 
  const IP = req.clientIP || req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress;
  const file = req.file;

  if (!name?.trim() && !bio?.trim() && !file) {
    throw new BadRequestError("Provide name, about, or image");
  }

  const imageUrl = file?.path || undefined;
  const publicId = file?.filename || undefined;

const add_details = await addInfo(
  req.user.id,
  name?.trim() || undefined,
  bio?.trim() || undefined,
  imageUrl,
  publicId,
  IP,
  userAgentObject  
);

  res.status(200).json({ success: true, result: add_details.data });
});