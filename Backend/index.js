import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to DB");
    
}).catch((err)=>{
    console.log(err);
    
});
const app = express();



app.use(express.json());
app.use("/api/auth", authRoutes);  

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