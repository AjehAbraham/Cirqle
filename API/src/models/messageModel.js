import mongoose from "mongoose";
import validate from "validator";


const messageSchema = new mongoose.Schema({
	ConversationID: {type: mongoose.Types.ObjectId, ref: "Conversation", required: true, index: true},
	SenderID: {type: mongoose.Types.ObjectId, ref: "RegisterDB", required: true},
	Type: {type: String, required: true, enum: ["text", "image", "text/image", "video", "audio", "file", "system"]},
	Content: {type: String},
	Reaction: {type: String},
	Attactments: [{url: String, type: String, size: Number, name: String}],
	GroupID: {type: String, index: true},
	Status: {type: String, enum: ["sending", "sent", "delivered", "read"], required: true, index: true},
	DeliveredTo: [{userId: String, At: Date}];
	SeenBy: [{userId: String, At: Date}];
	DeletedFor: [{type: mongoose.Types.ObjectId, ref: "RegisterDB"}],
	DeletedForEveryone: {type: Boolean, default: false},
	DeletedBy: {type: mongoose.Types.ObjectId},
	DeletedDate: Date,
	Edited: {type: Boolean, default: false},
	EditedAt: Date,
	EditCount: { type: Number, default: 0},
	EditHistory: [{OldContent: String, EditedAt: Date}],
	//ReadBy: [{UniqueID: mongoose.Types.ObjectId, ref: "RegisterDB", readAt: Date}],
	ReplyTo: {type: mongoose.Types.ObjectId, ref: "MessageDB"},
	IsForwarded: {type: Boolean, default: false},
	ForwardedFrom: {
		MessageID: {mongoose.Types.ObjectId, ref: "MessageDB"},
        OriginalSenderID: {type: mongoose.Types.ObjectId, ref: "RegisterDB"},
        OriginalConversationID: {type: mongoose.Types.ObjectId, ref: "Conversation"},
        At: {type: Date, default: Date.now}
	},
	ForwardCount: {type: Number, default: 0},
	timestamps: false,
	CreatedAt: {type: Date, default: Date.now, required: true},
});
 messageSchema.index({ConversationID: 1, CreatedAt: -1});
 messageSchema.index({SenderID: 1, CreatedAt: -1});
 
 
 const conversationSchema = new mongoose.Schema({
  Type: { type: String, enum: ["dm", "group", "internal"], required: true },
  Participants: [{ 
    UniqueID: { type: mongoose.Types.ObjectId, ref: "RegisterDB", required: true },
    JoinedAt: {type: Date, default: Date.now},
    Role: { type: String, enum: ["admin", "moderator", "member", "group-admin"], default: "member" },
    
	ChatSettings: {
	 Archive: {type: Boolean, default: false},
	 ClearChatAt: {type: Date, default: null},//CLEAR ALL CONVERSATION BUT KEEP CHAT SCREEN ON FRONTEND
	 DeleteAll: {type: Date, default: null},
	 WallPaper: {type: String, default: null}
  },
	Notification: {
	Mute: {type: Number, default: 0, enum: [0,1]}, //NO, YES(MUTE)
	Duration: {type: Date}
  }
	
	
  }],
  validate: {
	  validator: function (err) {
	  const max = this.Type === "dm" ? = 2 : 500;
	  return arr.length <= max;
	  },
	  message: "Participant limit exceeded";
  }
  
  },
  LastMessage: { type: mongoose.Types.ObjectId, ref: "MessageDB" },
  LastMessageAt: Date,
  Name: String, 
  Avatar: String
  
}, { timestamps: true });

conversationSchema.index({"Participants.UniqueID": 1, LastMessageAt: -1 });

const pinnedSchema = new mongoose.Schema({
	ConversationID: {type: mongoose.Types.ObjectId, ref: "Conversation", required: true},
	Type: {type: String, default: 0, enum: [0, 1, 2]}, //IMPORTANT_HIGH, IMPORTANT_LOW, IMPORTANT
	MessageId: {type: mongoose.Types.ObjectId, required: true}
	Status: {type: Boolean, default: true, required: true}, //ACTIVE OR NOT//
	
}, {timestamps: {createdAt: "CreatedAt", updatedAt: "UpdatedAt"}} );

pinnedSchema.index({ConversationID: 1, CreatedAt: -1});

const satredSchema = new mongoose.Schema({
	ConversationID: {type: mongoose.Types.ObjectId, ref: "Conversation", required: true},
	Type: {type: String, default: 0, enum: [0, 1, 2]}, //IMPORTANT_HIGH, IMPORTANT_LOW, IMPORTANT
	MessageId: {type: mongoose.Types.ObjectId, required: true}
	Status: {type: Boolean, default: true, required: true}, //ACTIVE OR NOT//
	
}, {timestamps: {createdAt: "CreatedAt", updatedAt: "UpdatedAt"}} );

export const starMessage = mongoose.model("StarredMessages", satredSchema);
export const pinMessage = mongoose.model("PinnedMessages", pinnedSchema);
export const conversationModel = mongoose.model("Conversation", conversationSchema);
export const messageModel = mongoose.model("MessageDB", messageSchema);
