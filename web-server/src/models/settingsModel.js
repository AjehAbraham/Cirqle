import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
	UniqueID: {type: mongoose.Types.ObjectId, ref: "RegisterDB", required: true, unique: true},
	ChatSettings: {
	ReadReceipt: {type: Boolean, default: false},
	SavePhoto: {type: Boolean, default: false}
	},
	PrivacySettings: {
	AvatarStatus: {type: Number, enum: [0,1,2,3,4], default: 0, required: true},// EVERYBODY,NOBODY, MYCONTACT, MYCONTACT EXCEPT
	AvatarExcept: [{type: mongoose.Types.ObjectId, ref: "RegisterDB"}],
	LastSeen: {type: Number, default: 0, enum: [0,1,2,3,4]}, //EVERYBODY,NOBODY, MYCONTACT, MYCONTACT EXCEPT
	IsOnline: {type:  Number, default: 2, required: true, enum: [0,1,2,3,4]}, //EVERYBODY,NOBODY, MYCONTACT, MYCONTACT EXCEPT
	About: {type: Number, required: true, default: 0, enum: [0,1,2,3,4]}, //EVERYBODY,NOBODY, MYCONTACT, MYCONTACT EXCEPT 
	AllowSharing: {type: Boolean, default: true}, //SHARING OF PHONE NUMBER//
	Fleet: {type: Number, required: true, default: 0, enum: [0,1,2,3,4]}, //EVERYBODY,NOBODY, MYCONTACT, MYCONTACT EXCEPT
	AutoDisappear: {
	Status: {type: Boolean, default: false, required: true},
	Timer: {type: Date}
	}
	},
	DisappearingMessage: [{
	 conversationId: {type: mongoose.Types.ObjectId, ref: "Conversation"},
	 timer: {type: Date}
	}],
	
	Notification: {
	Status: {type: Number, default: 0, enum: [0,1]}, //SHOW, MUTE
	Sound: {type: String, enum: [0, 1, 2, 3, 4, 5, 6, 7, 8], default: 0, required: true},
	Reaction: {type: Number, default: 0, enum: [0, 1]},//SHOW, HIDE
	HideAlert: [{
		conversationId: {type: mongoose.Types.ObjectId, ref: "Conversation"}
	}]
	},
	MediaStorage : {
		AutoDownload: {
		photo : {type: Boolean, default: false},
		audio: {type: Boolean, default: false},
		video: {type: Boolean, default: false},
		file: {type: Boolean, default: false}
		},
		MediaQuality: {type: Number, required: true, default: 1, enum: [0,1,2]}// LOW, STANDARD, HIGH//
	},
	Display: {
    Theme: {type: String, required: true, enum: ["light", "dark", "system"], default: "system"},
	//FontSize: {type: Number, required: true, default: 16, max: 30, min: 14},
	ChatWallpaper: {
	 url: String,
     size: Number,
	 type: String,
	 name: String 
	}
	},
	LinkedDevices: [{
		DeviceId: {type: mongoose.Types.ObjectId, ref: "Login_history",
		TokenVersion: String},
	LastActive: {type: Date}
	}],
	
	BlockUsers:
		[{ 
		userId: {type: mongoose.Types.ObjectId, ref: "RegisterDB" },
		At: { type: Date, default: Date.now}]
	}
}, {timestamps: {createdAt: "CreatedAt", updatedAt: "UpdatedAt"}});
 

export const settings = mongoose.model("Settings", settingsSchema);