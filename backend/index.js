const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected MongoDB"));
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoute = require('./routes/user')
app.use('/user', userRoute);

app.listen(process.env.PORT, () => console.log("App started at port:", process.env.PORT));