import express from "express";
import {VerifyToken} from "../utils/verifyUser.js";
import { addTravelStory, getAllTravelStory } from "../controller/travelStory.controller.js";

const router = express.Router(); 

router.post("/add", VerifyToken, addTravelStory);

router.get("/get-all", VerifyToken, getAllTravelStory);

export default router;     