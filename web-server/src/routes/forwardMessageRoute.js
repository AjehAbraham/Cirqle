import express from "express";
import {authenticate} from "../src/utils/auth.js";
import {forwardMessage} from "../src/controller/forwardMessage.js";

const forwardRoute = express.Router();

forwardRoute.post("/forward/message", authenticate, forwardMessage);

export default forwardRoute;