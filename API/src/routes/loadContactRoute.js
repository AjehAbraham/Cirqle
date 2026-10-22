import express from "express";
import { authenticate } from "../middleware/auth.js";
import { loadContact } from "../controller/processLoadContact.js";

const loadContactRoute = express.Router();
 loadContactRoute.post("/account/contact/load", authenticate, loadContact);
 export default loadContactRoute;