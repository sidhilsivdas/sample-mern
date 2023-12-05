const express = require("express");
const adminController = require("./admin.controller");
const adminRouter = express.Router();

adminRouter.get("/", adminController.getAllUsers);
//adminRouter.post("/", adminController.createPost);
//adminRouter.put("/:id", adminController.updateUser);
//adminRouter.delete("/:id", adminController.deleteUser);


module.exports = adminRouter;