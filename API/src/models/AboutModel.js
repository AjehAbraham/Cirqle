import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
	UniqueID: {type: mongoose.Types.ObjectId, required: true, ref: "RegisterDB"},
	CountryCode: {type: String, required: true, enum: ['+1', '+91', '+234', '+222']},
	Phone: {type: Number, required: true},
	Name: {type: String, maxlength: 20, minlength: 3},
	About: {type: String, maxlength: 101, minlength: 3},
	ImageUrl: {type: String},
	PublicID: {type: String},
	CreateAt: {type: Date, required: true, default: Date.now},
	IP: {type: String, required: true, maxlength: 18, minlength: 8},
	UserAgent: {type: String, required: true}
});

export const updateAbout = mongoose.model("Profile_info", aboutSchema);
 