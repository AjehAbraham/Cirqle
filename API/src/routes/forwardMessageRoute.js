import express from "express";
import {authenticate} from "../middleware/auth.js";
import {forwardMessage} from "../controller/forwardMessage.js";

const forwardRoute = express.Router();

forwardRoute.post("/forward/message", authenticate, forwardMessage);

export default forwardRoute;