import express from "express";
import { authenticate } from "../middleware/auth.js";
import { fetchDevicesController } from "../controller/processFetchDevices.js";

const devicesRoute = express.Router();
devicesRoute.post("/account/devices", authenticate, fetchDevicesController);
export default devicesRoute;