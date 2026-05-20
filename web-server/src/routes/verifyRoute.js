import express from "express";
import { ValidateTel } from "../src/middleware/validateTel.js"; 
import { processOTP } from "../src/controller/processOTP.js";

const verifyRouter = express.Router();
verifyRouter.post("/verify", ValidateTel, processOTP);
export default verifyRouter;