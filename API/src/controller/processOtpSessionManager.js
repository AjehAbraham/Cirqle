import { TooManyRequestsError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ValidateSession from "../service/validateOtpSession.js";


export const SessionManager = asyncHandler( async (req, res, next) => {
const {countryCode, Tel, Code, session } = req.body;
const result = await ValidateSession(countryCode, Tel, session);
  res.status(200).json(result);
});