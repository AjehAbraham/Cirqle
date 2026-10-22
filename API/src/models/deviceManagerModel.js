import mongoose from "mongoose";

const session = new mongoose.Schema({
	UniqueID: {type: mongoose.Types.ObjectId, ref : "RegisterDB", required: true},
	CountryCode: {type: String, required: true, enum: ["+1", "+44", "+91", "+234", "+222", "+86", "+49", "+33", "+81", "+61"]},
	Phone: {type: Number, required: true, maxlength: 11, minlength: 7},
	DeviceID: {type: String, unique: true, required: true},
	Token: {type: String},
	TokenVersion: {type: Number, required: true, default: 0},
	DeviceName: String,
	DeviceType: {type: String, enum: ["origin", "linked"]},
	isCurrentDevice: {type: Boolean, default: false},
	isMain: {type: Boolean, default: false},
	UserAgent: {browser: { type: String }, os: { type: String }, device: { type: String }, raw: { type: String }},
	LastActive: {type: Date, default: Date.now},
	IP: {type: String}
}, {timestamps: true});

session.index({UniqueID: 1, DeviceID: 1});

export const sessionManager = mongoose.model("Session_Manager", session);
