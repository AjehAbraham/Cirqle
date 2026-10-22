import express from "express";
import { authenticate } from "../middleware/auth.js";
import {ValidateContact} from "../middleware/validateContact.js"
import { processContact } from "../controller/processContact.js";

const contactRoute = express.Router();
 contactRoute.post("/account/contact/manage", authenticate, ValidateContact, processContact);

 export default contactRoute;