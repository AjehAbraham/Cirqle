import "dotenv/config";
import { ValidationError, ForbiddenError} from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Authenticate from "../service/VerifyUser.js";
import jwt from "jsonwebtoken";
import verifyDevice from "../service/verifyDevice.js";

const VerfiyPayLoad = asyncHandler (async (req, res, next) => {
     const {cCode, phone} = req.body;
    const result = await Authenticate(cCode, phone);
    if(!result.success) throw new ValidationError("Invalid phone number or user does not exist");
  
    const payLoad = req.cookies.access_token;
    const decoded = jwt.verify(payLoad, process.env.ACCESS_TOKEN_SECRET);
    //console.log("decoded:", decoded);
     
    const device = await verifyDevice(decoded.id, decoded.deviceId, decoded.tokenVersion);
	   if(!device.success) throw new ForbiddenError("Device session has expired or is not valid");
    res.status(200).json({success: true, data: {message: "authenticated"}});
   
});

export default VerfiyPayLoad;