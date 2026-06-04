import express from "express";
import {authenticate} from "../src/utils/auth.js";
import {restSetting} from "../src/controller/resetSettings.js";

const updateSetting = express.Router();

updateSetting.post("/settings/reset", authenticate, resetSetting);

export default updateSetting;