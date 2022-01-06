import dotenv  from "dotenv";
import express from 'express'; /* equivalent to: const express = require('express') */
import bodyParser from 'body-parser'; //for incoming post request
import wordsRoutes from './routes/words.js';
import mongoose from 'mongoose';


const app = express(); //initializing app so that application lies in app
dotenv.config(); //to read from .env file

app.use(bodyParser.json()); //initialize bodyParser middleware


//set starting path for all the words in users file
app.use('/words', wordsRoutes); //all wordsRoutes starts at /words


//use PORT from .env file or if nothing use 5000
const PORT = process.env.PORT || 5000;


//connect to MongoDB atlas cloud server, .connect returns a promise which we can handle
//process.env.CONNECTION_URL is the MongoDB atlas connection url
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true}) //second parameters to avoid warning messages
        .then(() => app.listen(PORT, () => console.log(`Server running on port : http://localhost:${PORT}`)))
        .catch((error) => console.log(`${error} did not connect`));


