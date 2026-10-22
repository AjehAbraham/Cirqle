import express from "express";
import { ValidateOTP } from "../middleware/ValidateOTP.js";
import { processOTP } from "../controller/processOTP.js";
import { parseUserAgent } from "../middleware/parseUserAgent.js";


const verifyRouter = express.Router();
verifyRouter.post("/verify/otp", ValidateOTP, parseUserAgent, processOTP);
export default verifyRouter;