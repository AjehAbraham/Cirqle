import cloudinary from "../src/config/cloudinary.js";

export const signCloudinaryUrl = (publicId, resourceType = "image", ttlSeconds = 604800) => {
  return cloudinary.url(publicId, {
    resource_type: resourceType,
    type: "authenticated",
    sign_url: true,
    secure: true,
    expires_at: Math.floor(Date.now() / 1000) + ttlSeconds // 7DAYS
  });
};