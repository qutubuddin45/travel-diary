import mongoose  from "mongoose";

const TravelStorySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    story : {
        type : String,
        required : true,
    },

    visitedLocation : {
        type : [String],
        default : [],
    },
    isFavorite : {
        type : Boolean,
        default : false,

    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,

    },
    imageURL : {
        type : String,
        required : true,
    },

    visitedDate : {
        type : Date,
        required : true,
    }
},{timestamps: true})   

const TravelStory = mongoose.model("TravelStory" , TravelStorySchema);
export default TravelStory;     