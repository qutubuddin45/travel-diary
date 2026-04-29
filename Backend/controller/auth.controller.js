import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js'
export  const signUp = async (req,res, next)=>{
    const{name,email,password} = req.body;

    if(!name || !email || !password || name==="" || email==="" || password===""){
        return next(errorHandler(400 , "All fields are required"));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        name,
        email,
        password : hashedPassword,
    })

    try{
        await newUser.save();
        res.json({message : "User created successfully"});

    }catch(error){
        return next(error); 
    }                  

}  

export const signIn = async(req,res,next) =>{
    const {email , password} = req.body;

    if(!email || !password || email ==="" || password===""){
        return next(errorHandler(400,"All fields are required"));
    }
    try{

    
    const validUser = await User.findOne({email});

    if(!validUser){
        return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);

    if(!validPassword){
        return next(errorHandler(400, "Invalid Password"));
    }
    const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET)
    const{password: pass , ...rest} = validUser._doc;
    res.status(200).cookie("access_token", token).json(rest);
} catch(error){
    return next(error);
}
}