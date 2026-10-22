import express from "express";
import { authenticate } from "../middleware/auth.js";
import { validateGetContact } from "../middleware/valiidateGetContact.js";
import { processGetContact } from "../controller/processGetContact.js";

const getContactRoute = express.Router();
getContactRoute.post("/account/contact/get", authenticate, validateGetContact, processGetContact);
export default getContactRoute;