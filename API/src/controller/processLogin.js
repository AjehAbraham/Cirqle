import { asyncHandler } from "../utils/asyncHandler.js";
import { BadRequestError } from "../utils/AppError.js";
import { sendOTP } from "../service/sendOTP.js";

export const processLogin = asyncHandler (async (req, res, next) =>{
    const cCode = req.body.countryCode;
    const Tel = req.body.Tel;
    const IP = req.body.ip;
    const UserAgent = req.body.UserAgent;
    const Exp = new Date(Date.now() + 10 * 60 * 1000);
    const result = await sendOTP(cCode, Tel, IP, UserAgent, Exp);
    res.status(200).json(result);
});