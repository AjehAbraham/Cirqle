import mongoose from "mongoose";

const sessionManager = new mongoose.Schema({
	UniqueID: {type: mongoose.Types.objectId, ref ="RegisterDB", required: true},
	CountryCode: {type: String, required: true, enum: ["+1", "+91", "+234", "+444"]},
	Phone: {type: Number, required: true, maxlength: 12, minlength: 8},
	DeviceID: {type: String, unique: true, required: true},
	TokenVersion: {type: Number, required: true, default: 0},
	DeviceName: String,
	LastActive: {type: Date, default: Date.now}
	
});

sessionManager.index({UniqueID: 1, DeviceID: 1});

export const sessionManager = mongoose.model("Session_Manager", sessionManager);
