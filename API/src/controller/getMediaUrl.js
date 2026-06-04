import { asyncHandler } from "../utils/asyncHandler.js";
import { BadRequestError, ForbiddenError } from "../utils/AppError.js";
import { signCloudinaryUrl } from "../utils/cloudinarySigner.js";
import Message from "../models/Message.js";

export const getMediaUrl = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  const message = await Message.findById(messageId);
  if (!message) throw new BadRequestError("Message not found");

  // Check if req.user is allowed to see this message
  const isParticipant = message.chatId.members.includes(req.user.id);
  if (!isParticipant) throw new ForbiddenError("You can't access this file");

  const url = signCloudinaryUrl(message.publicId, message.resourceType);

  res.json({ url, filename: message.originalName });
});

/*
import { get, set } from 'idb-keyval';

async function getMedia(messageId) {
  // 1. Check IndexedDB
  const cached = await get(messageId);
  if (cached) return URL.createObjectURL(cached);

  // 2. Fetch signed URL
  const res = await fetch(`/api/messages/media/${messageId}`);
  const { url } = await res.json();

  // 3. Fetch actual file, store as blob
  const fileRes = await fetch(url);
  const blob = await fileRes.blob();
  await set(messageId, blob);

  return URL.createObjectURL(blob);
}*/