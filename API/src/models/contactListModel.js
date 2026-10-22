import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import validator from "validator";


const contactListScehma = new mongoose.Schema({
    UniqueID: {
        type: Schema.Types.ObjectId, ref: "RegisterDB",
        index: true,
        required: true
    },
 ContactUserID: {
        type: Schema.Types.ObjectId, ref: "RegisterDB",
        index: true,
    },
  CountryCode: {
    type: String, required: true, enum: {
	  values: ["+1", "+44", "+91", "+234", "+222", "+86", "+49", "+33", "+81", "+61"],
  message: "{VALUE} is not a supported country  code"
  }},

  Phone: {
    type: String, 
     required: true,
	  validate: {
      validator: v => /^[0-9]{7,12}$/.test(v),
      message: "phone must be 7-12 digits only"
	  }
  },

  
 FirstName: {
  type: String,
  trim: true,
  maxLength: 40
 },
 
 LastName: {
  type: String,
  trim: true,
  maxLength: 40
 },
 Name: {
  type: String,
  trim: true,
  maxLength: 40
 }

}, {timestamps: true});


contactListScehma.index({ UniqueID: 1, ContactUserID: 1 }, {  unique: true, 
    partialFilterExpression: { ContactUserID: { $type: "objectId" } } 
  }
)
contactListScehma.index({UniqueID: 1, Name: 1});
export const ContactList = mongoose.model("Contact", contactListScehma);