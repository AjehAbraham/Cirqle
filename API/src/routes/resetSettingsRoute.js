import express from "express";
import {authenticate} from "../middleware/auth.js";
import {resetSetting} from "../controller/resetSettings.js";

const updateSetting = express.Router();

updateSetting.post("/settings/reset", authenticate, resetSetting);

export default updateSetting;