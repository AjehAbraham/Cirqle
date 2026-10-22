import express from "express";
import { authenticate } from "../middleware/auth.js";
import { validateDeleteContact } from "../middleware/validateDeleteContact.js";
import { processDelContact } from "../controller/processDeleteContact.js";

const deleteContactRoute = express.Router();
deleteContactRoute.post("/account/contact/delete", authenticate, validateDeleteContact, processDelContact);
export default deleteContactRoute;