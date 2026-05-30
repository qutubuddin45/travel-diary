import express from "express";
import {VerifyToken} from "../utils/verifyUser.js";
import { addTravelStory, getAllTravelStory, imageupload ,deleteImage, editTravelStory, deleteTravelStory,updateIsFavorite} from "../controller/travelStory.controller.js";
import upload from "../multer.js";

const router = express.Router(); 

router.post("/image-upload", upload.single("image"), imageupload);
router.delete("/delete-image", deleteImage );

router.post("/add", VerifyToken, addTravelStory);

router.get("/get-all", VerifyToken, getAllTravelStory);

router.post("/edit-story/:id", VerifyToken, editTravelStory);

router.post("/delete-story/:id", VerifyToken, deleteTravelStory)

router.put("/is-favorite/:id", VerifyToken, updateIsFavorite);

router.get("/search", VerifyToken, searchTravelStories );

export default router;        