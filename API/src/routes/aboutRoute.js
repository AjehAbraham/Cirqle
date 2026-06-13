import {authenticate} from "../middleware/auth.js";
import {addAbout} from "../controller/addAbout.js";
import {uploadSingleImage} from "../middleware/upload.js";
import express from "express";

const aboutRoute = express.Router();

aboutRoute.post("/update/profile", authenticate,uploadSingleImage, addAbout); 

export default aboutRoute;