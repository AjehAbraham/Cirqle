
import mongoose from "mongoose";
import validate from "validator";

const userSchema = new mongoose.Schema({
  CountryCode: {type: String, required: true, enum: {
	  values: ["+1", "+44", "+91", "+234", "+222", "+86", "+49", "+33", "+81", "+61"],
  message: "{VALUE} is not a supported country  code"
  }},
  Phone: {type: String, required: true,
	  validate: {
      validator: v => /^[0-9]{7,12}$/.test(v),
      message: "phone must be 8-12 digits only"
	  }
  },
  Role: {type: String, required: true, enum: ["admin", "user", "moderator", "regulator", "AI", "Beta", "customer-care", "Developer"], default: "user"},
  Status: {type: Number, required: true, enum: [0,1,2,3,4], default: 0}, //ACTIVE,INACTIVE,SUSPENDED,DECATIVATED,DELETED
}, {timestamps: true});
userSchema.index({CountryCode: 1, Phone: 1}, {unique: true});
export const registerModel = mongoose.model("RegisterDB", userSchema);
