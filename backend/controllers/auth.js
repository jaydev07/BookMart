const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt"); // for authorization check
const { validationResult } = require("express-validator");

const {errorHandler} = require("../helpers/errorHandler");
const HttpError = require("../helpers/http-error");

const signup = async (req,res,next) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError("Invalid input",400));
    }

    let userFound;
    try{
        userFound = await User.findOne({email:req.body.email});
    }catch(err){
        console.log(err);
        return next(new HttpError("Something went wrong",400));
    }
    if(userFound){
        return next(new HttpError("User already exists please signin",400));
    }

    let password = req.body.password;
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password,salt);

    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:password
    });
    try{
        await newUser.save();
    }catch(err){
        console.log(err);
        return next(new HttpError("user not saved",400));
    }
    newUser.password = undefined;
    res.json({user:newUser.toObject({getters:true})});
}

const signin = async (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return next(new HttpError("Invalid input",400));
    }
    
    const {email,password} = req.body;

    let userFound;
    try{
        userFound = await User.findOne({email:email});
    }catch(err){
        console.log(err);
        return next(new HttpError("Something went wrong",400));
    }

    if(!userFound){
        return next(new HttpError("User not found please signup",400));
    }else{
        // Check password
        const auth = await bcrypt.compare(password,userFound.password);
        if(!auth){
            return next(new HttpError("Wrong password.Please try again",400));
        }
    }

    const token = jwt.sign({userId:userFound.id} , process.env.JWT_SECTER);
    // Sending a cookie to frontend 
    res.cookie("t",token,{ expire:new Date() + 9999 });
    
    res.json({token:token, user:{id:userFound.id, email:userFound.email, name:userFound.name, role:userFound.role}});
}

const signout = async (req,res,next) => {
    res.clearCookie("t");
    res.json({message:"Signout success"});
} 

const requireSignin = expressJwt({
    secret:process.env.JWT_SECTER,
    userProperty:"auth",
    algorithms: ['RS256']
});

exports.signup = signup;
exports.signin = signin;
exports.signout = signout;
exports.requireSignin = requireSignin;