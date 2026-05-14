import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import travelStoryRoutes from './routes/TravelStory.route.js';
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to DB");
    
}).catch((err)=>{
    console.log(err);
     
});
const app = express();


app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);  
app.use("/api/user", userRoutes);
app.use("/api/travelStory", travelStoryRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname,"assets")))
app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success : false,
        message,
        statusCode,
    })
})