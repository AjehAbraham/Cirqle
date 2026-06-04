import express from "express";
import loadConvo from "../controller/loadConvo.js";
import {authenticate} from "../middleware/auth.js";

const loadConvoRoute = express.Router();

loadConvoRoute.post("/message/chat/reload", authenticate, loadConvo);

export default loadConvoRoute;