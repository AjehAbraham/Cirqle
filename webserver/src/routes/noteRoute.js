import express, { Router } from "express";
import { ValidateNote } from "../middleware/noteValidator.js";


const router = express.Router();

router.post('/', ValidateNote);


export default router;