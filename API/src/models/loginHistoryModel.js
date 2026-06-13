import mongoose from "mongoose";
import validator from "validator";

const loginSchema = new mongoose.Schema({
	UniqueID: {type: mongoose.Types.ObjectId, ref: "RegisterDB"},
	CountryCode: {type: String, required: true, enum: {
		values: ["+1", "+91", "+222", "+44", "+223","+234"],
	message: "{VALUE} is not a supported country  code"
  }},
  Phone: {type: String, required: true,
	  validate: {
      validator: v => /^[0-9]{8,12}$/.test(v),
      message: "phone must be 8-12 digits only"
	  }
  },
  Email: {type: String, validate: {
	 // validator: v =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
	  validator: v => validator.isEmail(v),
	  message: "Invalid email "
  }
  },
	CreatedAt: {type: Date, default: Date.now},
	IP: {type: String, required: true, maxlength: 18},
	UserAgent: {type: String, required: true}

});
export const loginHistory = mongoose.model( "Login_history", loginSchema);