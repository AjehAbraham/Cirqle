
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  CountryCode: {type: String, required: true, unique: true, enum: {
	  values: ["+1", "+91", "+222", "+44", "+223","+234"],
  message: "{VALUE} is not a supported country  code"
  }},
  Phone: {type: String, required: true, unique: true,
	  validate: {
      validator: v => /^[0-9]{8,12}$/.test(v),
      message: "phone must be 8-12 digits only"
	  }
  },
  Role: {type: String, required: true, enum: ["admin", "user", "moderator", "regulator", "AI", "Beta", "customer-care", "Developer"]},
  Status: {type: Number, required: true, unique: true, enum: [0,1,2,3,4], default: 0}, //ACTIVE,INACTIVE,SUSPENDED,DECATIVATED,DELETED
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

export const registerUser = mongoose.model("RegisterDB", userSchema);
