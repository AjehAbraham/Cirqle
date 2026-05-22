import "dotenv/config";
import {Server} from "socket.io";
import jwt from "jsonwebtoken";
import {ForbiddenError} from "../src/utils/AppError.js";
import {registerUser} from "../src/models/registerModel.js";
import {conversationModel, messageModel} from "../src/models/messageModel.js";


let io;

export const initSocket = (server) => {
	const PORT = process.env.PORT || 3000;
	
	io = new Server(server, {
		cors: {
		 origin: [`http://localhost:${PORT}`,
		 //https://google.com],//TESTIMG ONLY
		 credentials: true
		}
	});
	
	io.use(async (socket, next) => {
	
	 try{
		const token = socket.handshake.auth.token;
		const convoId = so
		if(!token) return next(new ForbiddenError("No token", "FORBIDDEN_ERROR"));
		
		const payLoad = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await registerModel.findById(payLoad.id).select("_id");
		if(!user) next(new UnauthorizeError("Permission denied to access this service", "UNAUTHORIZE_ERROR"));
		socket.userId = payLoad.id;
		next();
	 }catch(err){
		
		 if(err.name === "TokenExpiredError") {
			 return next(new ForbiddenError("Token expired", "TOKEN_EXPIRED"));
		 }
		next(new ForbiddenError("Token expired", "BAD_TOKEN"));
	 }
	});
	
	
	io.on("connection", (socket) => {
	console.log("connected", socket.userId);
	 
	 
	socket.on("joinRoom", (convoId) => {
		socket.join(convoId);
	});
	
	socket.on("leaveRoom", (convoId) => {
		socket.leave(convoId);
	});
	socket.on("typing:start", async (convoId) => {
		const sender = await registerUser.findById(socket.userId).select("CountryCode Phone Name");
		const fetchType = await conversationModel.findById(convoId).select("Type");
		
	    socket.broadcast.to(convoId).emit("typing:start", {
			userId: socket.userId,
			cCode: sender.CountryCode,
			phone: sender.Phone,
			name: sender.Name || null,
			type: fetchType.Type
			});
	});
	
	socket.on("typing:stop", async (convoId) => {
	    const sender = await registerUser.findById(socket.userId).select("CountryCode Phone Name");
		const fetchType = await conversationModel.findById(convoId).select("Type");
		
	    socket.broadcast.to(convoId).emit("typing:stop", {
			userId: socket.userId,
			cCode: sender.CountryCode,
			phone: sender.Phone,
			name: sender.Name || null,
			type: fetchType.Type
			});	
	});
	
	socket.on("message:delivered", async ({ convoId, messageId }) => {
		  await messageModel.updateOne(
		  {_id: messageId}, $addToSet: {"DeliveredTo.userId": socket.userId, At: Date.now}});
		  
			socket.broadcast.to(convoId).emit("message:delivered", 
			{ messageId, userId: socket.userId, convoId}
			);	
	});

	socket.on("message:seen", async ({ convoId, messageId }) => {
		 await messageModel.updateOne({_id: messageId}, {$addToSet: {"SeenBy.userId": socket.userId, At: Date.now}});
		 
		 socket.broadcast.to(convoId).emit("message:seen",
			{ messageId, userId: socket.userId, convoId});
			
		});
	
	});
	 return io;
}