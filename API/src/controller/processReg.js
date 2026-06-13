import { asyncHandler } from "../utils/asyncHandler.js";
import {InternalServerError} from "../utils/AppError.js";
import {sendOTP} from "../service/sendOTP.js";

export const processReg = asyncHandler(async (req, res, next) => {
  const cCode = req.body.CountryCode;
  const Phone = req.body.Tel;
  const UserAgent = req.body.UserAgent;
  const IP = req.body.ip;
  const Exp = false;
  
  const saveOTP = await sendOTP(cCode, Phone, IP, UserAgent, Exp);
  
  if (!saveOTP) {
	  throw new InternalServerError("Error occured on the server while trying to complete yoir request", "INTERNAL_SERVER_ERROR");
  }
    res.status(200).json(saveOTP);
  
});