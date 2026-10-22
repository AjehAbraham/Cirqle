import "dotenv/config";
import { saveOTP } from "../models/OTPmodel.js";
import { registerModel } from "../models/registerModel.js";
import { loginHistory } from "../models/loginHistoryModel.js";
import bcrypt from "bcrypt";
import { ValidationError, ConflictError, InternalServerError } from "../utils/AppError.js";
import { sessionManager } from "../models/deviceManagerModel.js";
import crypto from "crypto";
import { settings } from "../models/settingsModel.js";
import { OTPSessionManager } from "../models/OTPmodel.js";
import { aboutModel } from "../models/AboutModel.js";

export async function verify(OTP, cCode, Tel, session, IP, userAgentArray, deviceName) {
  try {
    const phone = `${cCode}${Tel}`;
    const WINDOW_START = new Date(Date.now() - 30 * 60 * 1000);

    const otpSession = await OTPSessionManager.findOne({
      Phone: phone,
      SessionID: session,
      createdAt: { $gte: WINDOW_START }
    });

    if (!otpSession) return { success: false, data: { message: "Invalid OTP session or otp session has expired", code: "exp" } };
    if (otpSession.Exp) return { success: false, data: { message: "OTP session has expire", code: "exp" } };

    const check = await saveOTP.findOne({
      CountryCode: cCode,
      Phone: Tel,
      expireAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) }
    }).sort({ createdAt: -1 });

    if (!check) throw new ValidationError("Invalid OTP", "OTP_VALIDATION_ERROR");
    if (check.Exp || check.Status >= 1) throw new ValidationError("OTP has expired or is invalid", "OTP_VALIDATION_ERROR");

    const isMatch = await bcrypt.compare(OTP, check.Hash);
    if (!isMatch) throw new ValidationError("OTP mismatch", "OTP_MISMATCH");

    await saveOTP.updateOne({ _id: check._id }, { $set: { Exp: true, Status: 1 } });
    await OTPSessionManager.updateOne({ _id: otpSession._id }, { $set: { Exp: true } });

    let user = await registerModel.findOne({ CountryCode: cCode, Phone: Tel });

    if (!user) {
      try {
        user = await registerModel.create({ CountryCode: cCode, Phone: Tel, Role: "user" });
      } catch (err) {
        if (err.code === 11000) throw new ConflictError("Phone number already registered", "PHONE_CONFLICT_ERROR");
        throw new InternalServerError("Failed to login/register user", "INTERNAL_SERVER_ERROR");
      }
    }

    await loginHistory.create({
      UniqueID: user._id,
      CountryCode: cCode,
      Phone: Tel,
      IP: IP,
      UserAgent: userAgentArray
    });

    const UUID = crypto.randomUUID();
    const deviceCode = crypto.randomUUID();
    const deviceHash = await bcrypt.hash(deviceCode, 12);

    await sessionManager.create({
      UniqueID: user._id,
      CountryCode: cCode,
      Phone: Tel,
      DeviceID: UUID,
      Token: deviceHash,
      TokenVersion: 0,
      DeviceName: deviceName,
      DeviceType: 'origin',
      isMain: true,
      isCurrentDevice: true,
      IP: IP,
      UserAgent: userAgentArray
    });

    await settings.findOne({ UniqueID: user._id });
    const checkAbout = await aboutModel.findOne({ UniqueID: user._id });
    const aboutCode = checkAbout ? 1 : 0;

    return {
      success: true,
      deviceCode: deviceCode,
      user: { id: user._id, cCode: cCode, phone: Tel, role: user.Role, deviceId: UUID, tokenVersion: 0, abtCode: aboutCode }
    };

  } catch (err) {
    console.log(err);
    return { success: false, error: err };
  }
}