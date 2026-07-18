import express from "express";
import {ValidateTel} from "../middleware/validateTel.js";
import { processLogin } from "../controller/processLogin.js";


const loginRoute = express.Router();

loginRoute.post("/login", ValidateTel, processLogin);
export default loginRoute;