import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const getUser = async (req,res,next) =>{
    const userId = req.user.id;

    try {
        const validUser = await User.findOne({_id : userId});

        if(!validUser){
            return next(errorHandler(404 , "Unauthorized"));
        }

        const{password:pass, ...rest} = validUser._doc;

        res.status(200).json(rest);
    } catch (err) {
        next(err);
    }
}