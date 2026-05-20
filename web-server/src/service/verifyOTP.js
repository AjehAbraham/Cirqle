import "dotenv/config";
import jwt from "jsonwebtoken";
import { saveOTP } from "../src/models/OTPmodel.js"; // missing before
import { registerUser } from "../src/models/registerModel.js";
import { loginHistory } from "../src/models/loginHistoryModel.js";
import bcrypt from "bcrypt";
import { ValidationError, ConflictError, InternalServerError } from "../src/utils/AppError.js";
import {sessionManager} from "../src/models/deviceManager.js";
import crypto from "crypto";
import {settings} from "../src/models/settingsModel.js";


export async function verify(OTP, cCode, Tel, IP, UserAgent, isVerify) {
  if (!isVerify) return null;

  const check = await saveOTP.findOne({
    CountryCode: cCode,
    Phone: Tel,
    expireAt: { $gte: new Date() }
  }).sort({ createdAt: -1 });

  if (!check) throw new ValidationError("OTP expired or not found", "OTP_VALIDATION_ERROR");
  if (check.Exp === true || check.Status === 2) throw new ValidationError("OTP has expired or is invalid", "OTP_VALIDATION_ERROR");

  const isMatch = await bcrypt.compare(OTP, check.Hash);
  if (!isMatch && OTP !== check.OTP) throw new ValidationError("Invalid OTP/OTP mismatch", "OTP_MISMATCH");

  await saveOTP.updateOne(
    { CountryCode: cCode, Phone: Tel, OTP: OTP },
    { $set: { Exp: true, Status: 1} }
  );

  let user = await registerUser.findOne({ CountryCode: cCode, Phone: Tel });

  if (!user) {
    try {
      user = await registerUser.create({
        CountryCode: cCode,
        Phone: Tel,
        Role: "user",
        IP: IP,
        UserAgent: UserAgent
      });
    } catch (err) {
      if (err.code === 11000) throw new ConflictError("Phone number already registered", "PHONE_CONFLICT_ERROR");
      throw new InternalServerError("Failed to register user", "INTERNAL_SERVER_ERROR");
    }
  }

  await loginHistory.create({
    UniqueID: user._id,
    CountryCode: cCode,
    Phone: Tel,
    Email: user.Email,
    IP,
    UserAgent
  });

  const UUID = crypto.randomUUID();
  const registerDevice = await sessionManager.create({
	UniqueID: user.id,
    CountryCode: cCode,
    Phone: Tel,
	DeviceID: UUID,
	TokenVersion: 0,
	DeviceName: UserAgent,
  });
  if(!registerDevice){
	  throw new ValidationError("An error occurred trying to register this device", "VALIDATION_ERROR");
  }
  const fetchSettings = await settings.findOne({UniqueID: user._id});
  if(!fetchSettings){
	  const saveSettings = await settings.create({UniqueID: user._id});
  }
  
  return { 
    success: true, 
    user: { id: user._id, role: user.Role, deviceId: UUID, tokenVersion: 0}
  };
}