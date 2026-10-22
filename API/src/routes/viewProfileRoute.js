import express from "express";
import { authenticate } from "../middleware/auth.js";
import { validateProfile } from "../middleware/validateViewProfile.js";
import { viewProfile } from "../controller/processViewProfile.js";


const ProfileRoute = express.Router();
ProfileRoute.post("/account/profile", authenticate, validateProfile, viewProfile);
export default ProfileRoute;