import express from "express";
import {authenticate} from "../middleware/auth.js";
import {validateMessage} from "../middleware/validateEditMessge.js";
import editMessage from "../controller/editMessge.js";

const editRouter = express.Router()

editRouter.post("send/message/edit", authenticate, validateMessage, editMessage);

export default editRouter;