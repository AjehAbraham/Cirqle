import express from "express";
import { authenticate } from "../middleware/auth.js";
import { validateDelete } from "../middleware/validate_deleteAccount.js";
import { processDelete } from "../controller/process_deleteAccount.js";

const deleteAccountRoute = express.Router();
deleteAccountRoute.post("/account/delete_account", authenticate,validateDelete, processDelete);
export default deleteAccountRoute;