import express from "express";
import {ValidateTel} from "../middleware/validateTel.js";
import { processLogin } from "../controller/processLogin.js";
import { parseUserAgent } from "../middleware/parseUserAgent.js";

const loginRoute = express.Router();

loginRoute.post("/login", ValidateTel, parseUserAgent, processLogin);
export default loginRoute;