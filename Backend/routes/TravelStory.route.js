import express from "express";
import {VerifyToken} from "../utils/verifyUser.js";
import { addTravelStory, getAllTravelStory, imageupload } from "../controller/travelStory.controller.js";
import upload from "../multer.js";

const router = express.Router(); 

router.post("/image-upload", upload.single("image"), imageupload);

router.post("/add", VerifyToken, addTravelStory);

router.get("/get-all", VerifyToken, getAllTravelStory);

export default router;        