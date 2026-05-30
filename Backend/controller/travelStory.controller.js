 import { errorHandler} from '../utils/error.js';
 import {fileURLToPath} from 'url';
 import fs from 'fs';
 import path from 'path';
import TravelStory from '../models/travelStory.model.js';
import { title } from 'process';
export const addTravelStory = async (req,res,next) => {
    const{title, story, visitedLocation, isFavorite, imageURL, visitedDate} = req.body;

    const userId = req.user.id;
    //validate require fields
    if(!title || !story || !imageURL  || !visitedLocation){
        return next(errorHandler(400, "All fields are required"));
    }
        // convert visited date from milliseocnd to date object
    const parsedvisitedDate = new Date(visitedDate);

    try{
        const travelStory = new TravelStory({
            title,
            story,
            visitedLocation,
            userId,
            imageURL,
            visitedDate : parsedvisitedDate,
        })
          
        await travelStory.save();

        res.status(201).json({
            story : travelStory,
            message : "Travel story added succesfully",

        })
    }
    catch(err){
  next(err); } 
}

export const  getAllTravelStory = async(req,res,next) => {
    const userId = req.user.id;
    try{
        const travelStories  = await TravelStory.find({userId}).sort({isFavorite : -1})

        res.status(200).json({
            stories : travelStories 
        })

    }catch(err){
      next(err);
    }
}

export const imageupload = async(req,res,next) => {
    try{
    if(!req.file){
        return  next(errorHandler(400, "Image is required"));
    }
    const imageURL = `http://localhost:3000/uploads/${req.file.filename}`;
    res.status(201).json({imageURL});
} catch(err){
    next(err);
}
}
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const rootDir = path.join(_dirname,"..");

export const deleteImage = async(req,res,next) => {
    const {ImageURL} = req.query;

    if(!ImageURL){
        return next(errorHandler(400, "Image URL is required"));
    }
  try {
        

const filename = path.basename(ImageURL);
// delete the file path 
const filePath  = path.join(rootDir, "uploads", filename);
console.log(filePath);

//check if the file exist
if(fs.existsSync(filePath)){
    fs.unlinkSync(filePath);
    res.status(200).json({message: "Image deleted successfully"});
} else {
    return next(errorHandler(404, "Image not found"));
} 
  } catch (error) {
   next(error);
  }
    
}

export const editTravelStory = async(req,res,next) => {
    const {id} = req.params;
    const { title, story, visitedLocation, isFavorite , imageURL , visitedDate} = req.body;

    if(!title || !story || !imageURL || !visitedDate || !visitedLocation){
    return next(errorHandler(400, "All fields are required"));
    }
     const userId = req.user.id;
        // convert visited date from milliseocnd to date object
        const parsedvisitedDate = new Date(visitedDate);

        try {
            const travelstory = await TravelStory.findOne({_id :id, userId :userId});

            if(!travelstory){
                return next(errorHandler(404, "Travel story not found"));
            }

            const placeHolderImageURL = `http://localhost:3000/assets/placeholderimage.jpg`
            travelstory.title = title
            travelstory.story = story
            travelstory.visitedLocation = visitedLocation
            travelstory.isFavorite = isFavorite
            travelstory.visitedDate = visitedDate
            travelstory.imageURL = imageURL || placeHolderImageURL

            await travelstory.save();

            res.status(200).json({
                story : travelstory,
                message : "Travel story updated succesfully"
            })
        } catch (error) {  
            next(error);
        }
}


export const deleteTravelStory = async(req,res,next) => {
    const{id} = req.params;
    const userId = req.user.id;

    try {
        const travelStory = await TravelStory.findOne({_id : id, userId : userId});

        if(!travelStory){
            next(errorHandler(404, "Travel story not found"));
        }
       // delete  travel strory from the database
        await travelStory.deleteOne({_id : id , userId : userId});
        // extract the filename from  the image url
        const imageURL = travelStory.imageURL;
        const filename = path.basename(imageURL);

        // delet the file path
        const filepath = path.join(rootDir , "uploads", filename);

        //check if the file exist
        if(!fs.existsSync(filepath)){
            return next(errorHandler(404,"Image not found"));
        }

        fs.unlinkSync(filepath);
        res.status(200).json({
            message : "Travel story deleted successfully"
        })

    } catch (error) {
        next(error);
    }
}



export const updateIsFavorite = async(req,res,next) => {
    const{id} = req.params;
    const userId = req.user.id;
    const{isFavorite} = req.body;
    try { 
        const travelStory  = await TravelStory.findOne({_id : id, userId : userId});

        if(!travelStory){
            return next(errorHandler(404, "Travel story not found"));
        }
        travelStory.isFavorite= isFavorite;

        await travelStory.save();

        res.status(200).json({
            story : travelStory,
            message : "Travel story updated successfully"
        })
        
    } catch (error) {
       next(error); 
    }
}

export const searchTravelStories = async(req,res, next) => {
    const{query} = req.query;
    const userId = req.user.id;
    
    if(!query){
        return next(errorHandler(400, "Query is required"));
    }

    try {
        
        
    } catch (error) {
        next(error);
    }
}