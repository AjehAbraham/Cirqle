import { authenticate } from "../middleware/auth.js";
import { parseUserAgent } from "../middleware/parseUserAgent.js";
import { uploadSingleProfileImage } from "../middleware/upload.js";
import { addAbout } from "../controller/addAbout.js";
import express from "express";

const aboutRoute = express.Router();
aboutRoute.post("/account/update/profile", authenticate, parseUserAgent, uploadSingleProfileImage, addAbout);
export default aboutRoute;