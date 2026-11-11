import { messageModel, conversationModel } from "../models/messageModel.js";
import { ContactList } from "../models/contactListModel.js";
import { registerModel } from "../models/registerModel.js";
import { aboutModel } from "../models/AboutModel.js";


async function loadConversations(userID) {
  const convos = await conversationModel
    .find({ "Participants.UniqueID": userID })
    .select("Type Participants LastMessage LastMessageAt Name Avatar")
    .sort({ LastMessageAt: -1 })
    .lean();

  if (!convos.length) return { success: true, data: [] };

  const lastMessageIds = convos.map(c => c.LastMessage).filter(Boolean);

  const messages = await messageModel
    .find({ _id: { $in: lastMessageIds } })
    .select("SenderID Type Content Reaction Status Editted IsForwarded CreatedAt DeletedForEveryone DeletedFor SeenBy")
    .lean();

  const messageMap = new Map(messages.map(m => [m._id.toString(), m]));

  const convoIds = convos.map(c => c._id);
  const unreadMessages = await messageModel
    .find({ 
      ConversationID: { $in: convoIds },
      SenderID: { $ne: userID },
      "SeenBy.UserID": { $ne: userID }
    })
    .select("ConversationID")
    .lean();

  const unreadCountMap = new Map();
  unreadMessages.forEach(msg => {
    const id = msg.ConversationID.toString();
    unreadCountMap.set(id, (unreadCountMap.get(id) || 0) + 1);
  });

  const data = await Promise.all(convos.map(async (convo) => {
    let lastMsg = messageMap.get(convo.LastMessage?.toString()) || null;

    if (lastMsg) {
      const isDeletedForEveryone = lastMsg.DeletedForEveryone === true;
      const isDeletedForMe = lastMsg.DeletedFor?.some(id => id.toString() === userID.toString());

      if (isDeletedForEveryone || isDeletedForMe) {
        lastMsg = {
          ...lastMsg,
          Type: "system",
          Content: { text: "This message was deleted" },
          OriginalType: lastMsg.Type
        };
      }
    }

    let displayName = convo.Name ;//|| convo.GroupName;
    let displayAvatar = convo.Avatar || null;

    if (convo.Type === "dm") {
         const getAvatar = await aboutModel.find({UniqueID: regUser._id});
            if(getAvatar){
            displayAvatar = getAvatar.ImageUrl;
            }else{
                displayAvatar = null;
            }
      const otherParticipant = convo.Participants.find(p => p.UniqueID.toString() !== userID.toString());
      if (otherParticipant) {
        const contact = await ContactList.findOne({
          UniqueID: userID,
          ContactUserID: otherParticipant.UniqueID
        }).lean();
        
        if (contact) {
          displayName = contact.Name || displayName;
        } else {
          const regUser = await registerModel.findById(otherParticipant.UniqueID).select("CountryCode Phone").lean();
          if (regUser) {
            displayName = `${regUser.CountryCode} ${regUser.Phone}`;
          }
        }
      }
    }

    return {
      _id: convo._id,
      Type: convo.Type,
      type: convo.Type?.toLowerCase(),
      //Participants: convo.Participants,
      LastMessageAt: convo.LastMessageAt,
      At: convo.LastMessageAt,
      LastMessageData: lastMsg,
      name: displayName || "Unknown",
      avatar: displayAvatar,
      lastMsg: lastMsg?.Content?.text || "",
      msgCount: unreadCountMap.get(convo._id.toString()) || 0,
      sender: lastMsg?.SenderID?.toString() === userID.toString() ? "you" : "them",
      status: lastMsg?.Status || "sent"
    };
  }));

  return { success: true, data };
}

export default loadConversations;