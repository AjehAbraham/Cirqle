import {authenticate} from "../src/middleware/auth.js";
import {addAbout} from "../src/controller/addAbout.js";
import {uploadSingleImage} from "../src/middleware/upload.js";
import express from "express";

const aboutRoute = express.Router();

aboutRoute.post("/update/profile", authenticate,uploadSingleImage, addAbout); 

export default aboutRoute;