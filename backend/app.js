const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;
const HttpError = require("./helpers/http-error");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// Morgan is used to see the routes in console
// app.use(morgan);
app.use(bodyParser.json());
// It is used to store the user credientials in cookie
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);

app.use((req,res,next) => {
    const error = new HttpError('Could not find the route!',404);
    next(error);
})

app.use((error,req,res,next) => {
    // If the response is already given
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message:error.message || 'An unknown error found!'});
})

mongoose
    .connect(process.env.DATABASE_URL,{useNewUrlParser:true , useCreateIndex:true, useUnifiedTopology: true})
    .then(() => {
        app.listen(port , () => {
            console.log(`Server is open at ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    })

