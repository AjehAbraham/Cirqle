import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser"
import http from "http";
import {initSocket} from "./socket.js";
import verifyRouter from "./src/routes/verifyRoute.js";
import loginRoute from "./src/routes/loginRoute.js";
import {NotFoundError} from "./src/utils/AppError.js";
import messageRouter from "./src/routes/sendMessageRoute.js";
import connectDB from "./src/config/db_connection.js";
import aboutRoute from "./src/routes/aboutRoute.js";
import forwardRoute from "./src/routes/forwardMessageRoute.js";
import updateSetting from "./src/routes/resetSettingsRoute.js";
import refreshToken from "./src/routes/refreshTokenRoute.js";
import editRouter from "./src/routes/editMessageRoute.js";
<<<<<<< HEAD
import loadConvoRoute from "../src/routes/loadConvoRoute.js";
=======
import loadConvoRoute from "./src/routes/loadConvoRoute.js";
>>>>>>> 7019625e3178f733a96060817841b6488dc38d97


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

//await connectDB();

app.use("/api", loginRoute);
app.use("/api", verifyRouter);
app.use("/api", aboutRoute);
app.use("/api", messageRouter);
app.use("/api", forwardRoute);
app.use("/api", updateSetting );
app.use("/api", refreshToken);
app.use("/api", editRouter);
app.use("/api", loadConvoRoute);


app.use( (req, res, next) => {
   next( new NotFoundError("Route cannot be found", "NOT_FOUND_ERROR"));
});

app.use( (err, req, res, next) => {
  const status = err.status || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "Error occurred on the server while trying to complete your request, please retry again later";
  
  res.status(status).json({
	error: {message, code}  
  });
});


const server = http.createServer(app);
const io = initSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`server running on: https://localhost:${PORT}`);
});

export {io};