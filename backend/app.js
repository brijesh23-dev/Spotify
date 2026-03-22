const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const  app = express();
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.router');
const musicRouter = require("./routes/music.router")
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter);
app.use('/api/music',musicRouter)

module.exports = app;