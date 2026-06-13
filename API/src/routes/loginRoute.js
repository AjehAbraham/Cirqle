import express from "express";
import {ValidateTel} from "../middleware/validateTel.js";
import {authenticate} from "../middleware/auth.js";
import {processOTP} from "../controller/processOTP.js";

const loginRoute = express.Router();

loginRoute.post("/login", ValidateTel, processOTP);
export default loginRoute;