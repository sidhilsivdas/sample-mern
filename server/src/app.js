const express = require("express");
const cors = require("cors");
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/database');
connectDB();
const userRouter = require("./routes/users/users.routes");
const authRouter = require("./routes/auth/auth.routes");

const {adminAuth} = require("./middlewares/adminAuth");
const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
//app.use("/planets",planetRouter);
//app.use("/launches",launchRouter);
app.use("/auth", authRouter);
app.use("/users", adminAuth, userRouter);


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
module.exports = app;