import express from "express";
import { ValidateTel } from "../middleware/validateTel.js"; 
import { processOTP } from "../controller/processOTP.js";

const verifyRouter = express.Router();
verifyRouter.post("/verify", ValidateTel, processOTP);
export default verifyRouter;