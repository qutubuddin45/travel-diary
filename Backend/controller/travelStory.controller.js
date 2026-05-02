import { errorHandler} from '../utils/error.js';
import TravelStory from '../models/travelStory.model.js';
export const addTravelStory = async (req,res,next) => {
    const{title, story, visitedLocation, isFavorite, imageURL, visitedDate} = req.body;

    const userId = req.user.id;
    //validate require fields
    if(!title || !story || !imageURL || !visitedDate){
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