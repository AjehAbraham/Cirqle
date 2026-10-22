import express from "express";
import ValidateSessionToken from "../middleware/validateSessionToken.js";
import VerfiyPayLoad from "../controller/validateSession.js";

const SeesionValidatorRoute = express.Router();
SeesionValidatorRoute.post("/session/verfiy", ValidateSessionToken, VerfiyPayLoad);

export default SeesionValidatorRoute;