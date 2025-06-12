const express = require('express');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected MongoDB:", process.env.MONGO_URL));

app.listen(process.env.PORT, () => console.log("App started at port:", process.env.PORT));