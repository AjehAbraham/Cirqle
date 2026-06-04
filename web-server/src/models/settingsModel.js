import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  UniqueID: {type: mongoose.Types.ObjectId, ref: "RegisterDB", required: true, unique: true},
  
  ChatSettings: {
    ReadReceipt: {type: Boolean, default: false},
    SavePhoto: {type: Boolean, default: false}
  },
  
  PrivacySettings: {
    AvatarStatus: {type: Number, enum: [0,1,2,3,4], default: 0, required: true},
    AvatarExcept: [{type: mongoose.Types.ObjectId, ref: "RegisterDB"}],
    LastSeen: {type: Number, default: 0, enum: [0,1,2,3,4]},
    IsOnline: {type: Number, default: 2, required: true, enum: [0,1,2,3,4]},
    About: {type: Number, required: true, default: 0, enum: [0,1,2,3,4]},
    AllowSharing: {type: Boolean, default: true},
    Fleet: {type: Number, required: true, default: 0, enum: [0,1,2,3,4]},
    AutoDisappear: {
      Status: {type: Boolean, default: false, required: true},
      Timer: {type: Number, default: 24*60*60} // seconds, not Date
    },
    DisappearingMessage: [{
      conversationId: {type: mongoose.Types.ObjectId, ref: "Conversation"},
      timer: {type: Number, default: 24*60*60} // seconds
    }]
  },
  
  Notification: {
    Status: {type: Number, default: 0, enum: [0,1]},
    Sound: {type: Number, enum: [0, 1, 2, 3, 4, 5, 6, 7, 8], default: 0, required: true}, // changed to Number
    Reaction: {type: Number, default: 0, enum: [0, 1]},
    HideAlert: [{
      conversationId: {type: mongoose.Types.ObjectId, ref: "Conversation"}
    }]
  },
  
  MediaStorage: {
    AutoDownload: {
      photo: {type: Boolean, default: false},
      audio: {type: Boolean, default: false},
      video: {type: Boolean, default: false},
      file: {type: Boolean, default: false}
    },
    MediaQuality: {type: Number, required: true, default: 1, enum: [0,1,2]}
  },
  
  Display: {
    Theme: {type: String, required: true, enum: ["light", "dark", "system"], default: "system"},
    ChatWallpaper: {
      url: String,
      size: Number,
      type: String,
      name: String 
    }
  },
  
  LinkedDevices: [{
    DeviceId: {type: mongoose.Types.ObjectId, ref: "Login_history"}, // closed brace here
    TokenVersion: String,
    LastActive: {type: Date}
  }],
  
  BlockUsers: [{ 
    userId: {type: mongoose.Types.ObjectId, ref: "RegisterDB" },
    At: { type: Date, default: Date.now }
  }]
  
}, {timestamps: {createdAt: "CreatedAt", updatedAt: "UpdatedAt"}});

export const settings = mongoose.model("Settings", settingsSchema);