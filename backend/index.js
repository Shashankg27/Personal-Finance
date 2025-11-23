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
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

const userRoute = require('./routes/user');
app.use('/user', userRoute);
app.get('/', async (req, res) => {
  return res.json({
    status: "working"
  })
});
app.get('/data/user', checkForAuthenticationCookie("token"), async (req, res) => {
  // return res.json({ name: "Shashank" });

  const cookieValue = req.cookies['token'];
  // console.log(cookieValue);
  const userPayload = validateToken(cookieValue);
  // console.log(userPayload);
  return res.json(userPayload);
});

app.listen(process.env.PORT, () => console.log("App started at port:", process.env.PORT));