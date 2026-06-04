import express from "express";
import {authenticate} from "../middleware/auth.js";
import validateMessage from "../middleware/validateEditMessage.js";
import editMessage from "../controller/editMessage.js";

const editRouter = express.Router()

editRouter.post("send/message/edit", authenticate, validateMessage, editMessage);

export default editRouter;