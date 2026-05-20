import express from "express";
import {regenerate} from "../src/controller/regenerateToken.js";


const refreshToken = express.Router();

app.post("/token/refresh", regenerate);
export default refreshToken;