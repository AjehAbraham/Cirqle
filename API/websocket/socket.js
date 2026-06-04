import "dotenv/config";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../src/utils/AppError.js";
import { registerModel } from "../src/models/registerModel.js";
import { conversationModel, messageModel } from "../src/models/messageModel.js";

let io;

export const initSocket = (server) => {
  const PORT = process.env.PORT || 3000;
  
  io = new Server(server, {
    cors: {
      origin: [`http://localhost:${PORT}`],
      credentials: true
    }
  });
  
  // Auth middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new ForbiddenError("No token", "FORBIDDEN_ERROR"));
      
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await registerModel.findById(payload.id).select("_id");
      if (!user) return next(new UnauthorizedError("Permission denied", "UNAUTHORIZE_ERROR"));
      
      socket.userId = payload.id.toString();
      socket.join(socket.userId); // personal room for inbox updates
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return next(new ForbiddenError("Token expired", "TOKEN_EXPIRED"));
      }
      next(new ForbiddenError("Bad token", "BAD_TOKEN"));
    }
  });
  
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.userId);
    
    
    socket.on("joinRoom", (conversationId) => {
      const isMember = await conversationModel.findOne(_id: conversationId, 'Participants.UniqueID': socket.userId);
      if(!isMember){
        socket.emit("error", {code: "FORBIDDEN", msg: "Not a member of this conversation"});
      }
      socket.join(conversationId);
      socket.emit("joined", conversationId);
      
    });
    
    socket.on("leaveRoom", (conversationId) => {
      socket.leave(conversationId);
    });
    
    // Typing indicators
    socket.on("typing:start", async (conversationId) => {
      const sender = await registerModel.findById(socket.userId).select("CountryCode Phone Name");
      const convo = await conversationModel.findById(conversationId).select("Type");
      
      socket.broadcast.to(conversationId).emit("typing:start", {
        userId: socket.userId,
        cCode: sender.CountryCode,
        phone: sender.Phone,
        name: sender.Name || null,
        type: convo?.Type
      });
    });
    
    socket.on("typing:stop", async (conversationId) => {
      const sender = await registerModel.findById(socket.userId).select("CountryCode Phone Name");
      const convo = await conversationModel.findById(conversationId).select("Type");
      
      socket.broadcast.to(conversationId).emit("typing:stop", {
        userId: socket.userId,
        cCode: sender.CountryCode,
        phone: sender.Phone,
        name: sender.Name || null,
        type: convo?.Type
      });	
    });
    
    // Delivery + seen receipts
    socket.on("message:delivered", async ({ conversationId, messageId }) => {
      await messageModel.updateOne(
        { _id: messageId },
        { $addToSet: { DeliveredTo: { userId: socket.userId, At: new Date() } }
      );
      
      socket.broadcast.to(conversationId).emit("message:delivered", {
        messageId, userId: socket.userId, conversationId
      });	
    });

    socket.on("message:seen", async ({ conversationId, messageId }) => {
      await messageModel.updateOne(
        { _id: messageId }, 
        { $addToSet: { SeenBy: { userId: socket.userId, At: new Date() } }
      );
      
      socket.broadcast.to(conversationId).emit("message:seen", {
        messageId, userId: socket.userId, conversationId
      });
    });
    
      socket.on("last:seen", async () )
    socket.on("disconnect", async () => {
      try{
       const sender = await registerModel.findById(socket.userId);
        if(!sender) return;
        
        for(const room of socket.room){
          if(room === socket.id || room === socket.userId) continue;
          const convo = await converstionModel.findById(room).select("Type");
          
          socket.broadcast.to(room).emit("typing:stop", {
          userId: socket.userId,
          cCode: sender.CountryCode,
          phone: sender.Phone,
          name: sender.Name || null,
          type: convo?.Type  
          });
        }
      }catch(err){
      console.error("Socket disconnected:", err);
      }
    });
  });
  
  return io;
};

// Export for controller to emit events
export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};