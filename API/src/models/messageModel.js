import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    ConversationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    SenderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisterDB",
      required: true,
    },

    Type: {
      type: String,
      required: true,
      enum: ["text", "image", "text/image", "video", "audio", "file", "system"],
    },

    Content: String,
    Reaction: String,

    Attachments: [
      {
        url: String,
        type: String,
        size: Number,
        name: String,
      },
    ],

    GroupID: {
      type: String,
      index: true,
    },

    Status: {
      type: String,
      enum: ["sending", "sent", "delivered", "read"],
      required: true,
      index: true,
    },

    DeliveredTo: [
      {
        userId: String,
        At: Date,
      },
    ],

    SeenBy: [
      {
        userId: String,
        At: Date,
      },
    ],

    DeletedFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegisterDB",
      },
    ],

    DeletedForEveryone: {
      type: Boolean,
      default: false,
    },

    DeletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisterDB",
    },

    DeletedDate: Date,

    Edited: {
      type: Boolean,
      default: false,
    },

    EditedAt: Date,

    EditCount: {
      type: Number,
      default: 0,
    },

    EditHistory: [
      {
        OldContent: String,
        EditedAt: Date,
      },
    ],

    ReplyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageDB",
    },

    IsForwarded: {
      type: Boolean,
      default: false,
    },

    ForwardedFrom: {
      MessageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MessageDB",
      },

      OriginalSenderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegisterDB",
      },

      OriginalConversationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },

      At: {
        type: Date,
        default: Date.now,
      },
    },

    ForwardCount: {
      type: Number,
      default: 0,
    },

    CreatedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

messageSchema.index({ ConversationID: 1, CreatedAt: -1 });
messageSchema.index({ SenderID: 1, CreatedAt: -1 });

const conversationSchema = new mongoose.Schema(
  {
    Type: {
      type: String,
      enum: ["dm", "group", "internal"],
      required: true,
    },

    Participants: {
      type: [
        {
          UniqueID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RegisterDB",
            required: true,
          },

          JoinedAt: {
            type: Date,
            default: Date.now,
          },

          Role: {
            type: String,
            enum: ["admin", "moderator", "member", "group-admin"],
            default: "member",
          },

          ChatSettings: {
            Archive: {
              type: Boolean,
              default: false,
            },

            ClearChatAt: {
              type: Date,
              default: null,
            },

            DeleteAll: {
              type: Date,
              default: null,
            },

            WallPaper: {
              type: String,
              default: null,
            },
          },

          Notification: {
            Mute: {
              type: Number,
              default: 0,
              enum: [0, 1],
            },

            Duration: Date,
          },
        },
      ],

      validate: {
        validator: function (arr) {
          const max = this.Type === "dm" ? 2 : 500;
          return arr.length <= max;
        },
        message: "Participant limit exceeded",
      },
    },

    LastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageDB",
    },

    LastMessageAt: Date,

    Name: String,

    Avatar: String,
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({
  "Participants.UniqueID": 1,
  LastMessageAt: -1,
});

const pinnedSchema = new mongoose.Schema(
  {
    ConversationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    Type: {
      type: Number,
      default: 0,
      enum: [0, 1, 2],
    },

    MessageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    Status: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "CreatedAt",
      updatedAt: "UpdatedAt",
    },
  }
);

pinnedSchema.index({
  ConversationID: 1,
  CreatedAt: -1,
});

const starredSchema = new mongoose.Schema(
  {
    ConversationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    Type: {
      type: Number,
      default: 0,
      enum: [0, 1, 2],
    },

    MessageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    Status: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "CreatedAt",
      updatedAt: "UpdatedAt",
    },
  }
);

export const starMessage = mongoose.model(
  "StarredMessages",
  starredSchema
);

export const pinMessage = mongoose.model(
  "PinnedMessages",
  pinnedSchema
);

export const conversationModel = mongoose.model(
  "Conversation",
  conversationSchema
);

export const messageModel = mongoose.model(
  "MessageDB",
  messageSchema
);