import express from "express";
import {ValidateTel} from "../src/middleware/validateTel.js";
import {authenticate} from "../src/middleware/auth.js";
import {processOTP} from "../src/controller/processOTP.js";

const loginRoute = express.Router();

loginRoute.post("/login", ValidateTel, processOTP);
export default loginRoute;