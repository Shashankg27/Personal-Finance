const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const { validateToken } = require('./services/authentication');

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected MongoDB"));
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

const userRoute = require('./routes/user');
app.use('/user', userRoute);
app.get('/data/user', checkForAuthenticationCookie, async (req, res) => {
  const cookieValue = req.cookies['token'];
  const userPayload = validateToken(cookieValue);
  return res.json(userPayload);
});

app.listen(process.env.PORT, () => console.log("App started at port:", process.env.PORT));