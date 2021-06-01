const express = require('express');
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();

const userRoutes = require("./routes/user");

const port = process.env.PORT || 5000;

app.use("/api/user",userRoutes);

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

