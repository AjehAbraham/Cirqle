import { registerModel } from "../models/registerModel.js";
import { settings } from "../models/settingsModel.js";
import { messageModel, conversationModel, starMessage } from "../models/messageModel.js";
import { aboutModel } from "../models/AboutModel.js";
import { sessionManager } from "../models/deviceManagerModel.js";
import { loginHistory } from "../models/loginHistoryModel.js";
import { OTPSessionManager } from "../models/OTPmodel.js";
import { saveOTP } from "../models/OTPmodel.js";
import { RateLimiting } from "../models/RateLimiting.js";
import { ContactList } from "../models/contactListModel.js";
import mongoose from "mongoose";

export async function DeleteAccountService(userID, phone) {
  let mongoSession = null;
  let useTransaction = true;

  try {
    mongoSession = await mongoose.startSession();
    mongoSession.startTransaction();
  } catch {
    useTransaction = false;
    mongoSession = null;
  }

  const opts = useTransaction ? { session: mongoSession } : {};

  try {
    const baseQuery = registerModel.findOne({ _id: userID });
    const user = useTransaction ? await baseQuery.session(mongoSession) : await baseQuery;
    if (!user) {
      if (useTransaction) await mongoSession.abortTransaction();
      return { success: false };
    }

    const fullPhone = `${user.CountryCode}${user.Phone}`;
    if (fullPhone.toString() !== phone.toString()) {
      if (useTransaction) await mongoSession.abortTransaction();
      return { success: false };
    }

    await settings.deleteOne({ UniqueID: userID }, opts);
    await aboutModel.deleteOne({ UniqueID: userID }, opts);
    await RateLimiting.deleteOne({ UniqueID: userID }, opts);
    await loginHistory.deleteMany({ UniqueID: userID }, opts);
    await OTPSessionManager.deleteMany({ UniqueID: userID }, opts);
    await sessionManager.deleteMany({ UniqueID: userID }, opts);
    await saveOTP.deleteMany({ UniqueID: userID }, opts);
    await ContactList.deleteMany({ UniqueID: userID }, opts);
    await ContactList.updateMany({ ContactUserID: userID }, { $set: { ContactUserID: null } }, opts);

    const convBase = conversationModel.find({ "Participants.UniqueID": userID }, { _id: 1, Type: 1 });
    const conversations = useTransaction ? await convBase.session(mongoSession) : await convBase;

    for (const convo of conversations) {
      const [systemMsg] = await messageModel.create(
        [
          {
            ConversationID: convo._id,
            SenderID: userID,
            Type: "system",
            Content: convo.Type === "dm" ? "Account deleted" : "left the group",
            CreatedAt: new Date(),
          },
        ],
        opts
      );

      await conversationModel.updateOne(
        { _id: convo._id },
        {
          LastMessage: systemMsg._id,
          LastMessageAt: new Date(),
          $pull: { Participants: { UniqueID: userID } },
        },
        opts
      );
    }

    await messageModel.updateMany({ SenderID: userID }, { $set: { DeletedFor: userID } }, opts);
    await starMessage.deleteMany({ UniqueID: userID }, opts);
    await registerModel.deleteOne({ _id: userID }, opts);

    if (useTransaction) await mongoSession.commitTransaction();
    return { success: true };
  } catch (err) {
    if (useTransaction && mongoSession) await mongoSession.abortTransaction();
    if (err.code === 20) {
      if (mongoSession) mongoSession.endSession();
      return DeleteAccountServiceNoTx(userID, phone);
    }
    return { success: false, error: err };
  } finally {
    if (mongoSession) mongoSession.endSession();
  }
}

async function DeleteAccountServiceNoTx(userID, phone) {
  try {
    const user = await registerModel.findOne({ _id: userID });
    if (!user) return { success: false };

    const fullPhone = `${user.CountryCode}${user.Phone}`;
    if (fullPhone.toString() !== phone.toString()) return { success: false };

    await settings.deleteOne({ UniqueID: userID });
    await aboutModel.deleteOne({ UniqueID: userID });
    await RateLimiting.deleteOne({ UniqueID: userID });
    await loginHistory.deleteMany({ UniqueID: userID });
    await OTPSessionManager.deleteMany({ UniqueID: userID });
    await sessionManager.deleteMany({ UniqueID: userID });
    await saveOTP.deleteMany({ UniqueID: userID });
    await ContactList.deleteMany({ UniqueID: userID });
    await ContactList.updateMany(
  { ContactUserID: userID }, 
  { $unset: { ContactUserID: "" }, $set: { isDeletedContact: true } }, 
  opts
);

    const conversations = await conversationModel.find({ "Participants.UniqueID": userID }, { _id: 1, Type: 1 });

    for (const convo of conversations) {
      const [systemMsg] = await messageModel.create([
        {
          ConversationID: convo._id,
          SenderID: userID,
          Type: "system",
          Content: convo.Type === "dm" ? "Account deleted" : "left the group",
          CreatedAt: new Date(),
        },
      ]);

      await conversationModel.updateOne(
        { _id: convo._id },
        {
          LastMessage: systemMsg._id,
          LastMessageAt: new Date(),
          $pull: { Participants: { UniqueID: userID } },
        }
      );
    }

    await messageModel.updateMany({ SenderID: userID }, { $set: { DeletedFor: userID } });
    await starMessage.deleteMany({ UniqueID: userID });
    await registerModel.deleteOne({ _id: userID });

    return { success: true };
  } catch (err) {
     console.log(err);
    return { success: false, error: err };
  }
}