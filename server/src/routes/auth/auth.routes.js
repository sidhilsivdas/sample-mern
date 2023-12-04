const express = require("express");
const authController = require("./auth.controller");
const authRouter = express.Router();

authRouter.post("/login", authController.loginUser);
authRouter.post("/register-user", authController.registerUser);


module.exports = authRouter;