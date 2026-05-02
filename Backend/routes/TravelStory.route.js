import express from "express";
import {VerifyToken} from "../utils/verifyUser.js";
import { addTravelStory } from "../controller/travelStory.controller.js";

const router = express.Router(); 

router.post("/add", VerifyToken, addTravelStory); 

export default router;   