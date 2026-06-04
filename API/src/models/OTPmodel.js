
import mongoose from "mongoose";
import validate from "validator";

const OTPschema = new mongoose.Schema({
	CountryCode: {
  type: String,
  required: true,
  enum: {
    values: ["+1", "+44", "+91", "+234", "+222", "+86", "+49", "+33", "+81", "+61"],
    message: "{VALUE} is not a supported country code"
  }
},
   Phone: {type: String, required: true,
   validate: {
      validator: v => /^[0-9]{8,12}$/.test(v),
      message: "phone must be 8 or 12 digits only"
    }
   },
	OTP: {type: String, required: true, validate: {
      validator: v => /^[0-9]{5,6}$/.test(v),
      message: "OTP must be 5 or 6 digits"
    }},
	Hash: {type: String, required: true},
	expireAt: {type: Date, required: true, default: () => Date.now() + 5*60*1000},//EXPIRES AT 5 mintues//
	createdAt: {type: Date, required: true, default: Date.now },
	Exp: {type: Boolean, default: false},
	Status: {type: Number, required: true, default: 0, enum: [0,1,2,3]},// ACTIVE,USED,SMS FAILED TO SEND, AUTO UUPDATED BY USER(by requesting new OTP)//
	IP: {type: String, required: true, maxlength: 18},
    UserAgent: {type: String, default: "Web", required: true}
});

export const saveOTP = mongoose.model("OTP_Table", OTPschema);
