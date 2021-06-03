const User = require("../models/user");
const HttpError = require("../helpers/http-error");

// This will be the middleware
const userById = async (req,res,next,id) => {
    let userFound;
    try{
        userFound=await User.findById(id);
    }catch(err){
        console.log(error);
        return next(new HttpError("User not found",400));
    }

    req.profile=userFound.toObject({getters:true});
    next();
}

exports.userById=userById;