import express from "express";
import {regenerate} from "../controller/regenerateToken.js";


const refreshToken = express.Router();

refreshToken.post("/token/refresh", regenerate);
export default refreshToken;