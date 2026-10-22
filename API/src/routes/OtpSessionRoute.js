import { ValidateSessionDetails } from "../middleware/validateSession.js";
import { SessionManager } from "../controller/processOtpSessionManager.js";
import express from "express";

const OTPSession = express.Router();

OTPSession.post("/verifySession", ValidateSessionDetails, SessionManager);

export default OTPSession;