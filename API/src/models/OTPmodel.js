
import mongoose from "mongoose";
import validate from "validator";

const OTPschema = new mongoose.Schema({
	CountryCode: {type: String,required: true,
  enum: {
    values: ["+1", "+44", "+91", "+234", "+222", "+86", "+49", "+33", "+81", "+61"],
    message: "{VALUE} is not a supported country code"
  }
},
 Code: {type: String, required: true, enum: {values: ["NG", "US", "GB", "ZA", "AU", "CA", "IN", "CA", "GH", "FR"], message: "{VALUE} is not supported code"}},
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
	Status: {type: Number, required: true, default: 0, enum: [0,1]},// ACTIVE,USED,SMS FAILED TO SEND, AUTO UUPDATED BY USER(by requesting new OTP)//
	IP: {type: String, required: true, maxlength: 18},
  UserAgent: {browser: { type: String }, os: { type: String }, device: { type: String }, raw: { type: String }},
});




const OTPSessionSchema = new mongoose.Schema({
Phone: {type: String, required: true},
SessionID: {type: String, required: true},
Exp: {type: Boolean, default: false},
expireAt: {type: Date, required: true, default: () => Date.now() + 30*60*1000}  
}, 
{timestamps: true})

OTPschema.index({Phone: -1});
OTPSessionSchema.index({Phone: -1, SessionID: -1});
export const saveOTP = mongoose.model("OTP_Table", OTPschema);
export const OTPSessionManager = mongoose.model("OTPSessionManager", OTPSessionSchema);