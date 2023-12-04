const express = require("express");
const postsController = require("./posts.controller");
const postsRouter = express.Router();

postsRouter.get("/", postsController.getAllPosts);
postsRouter.post("/", postsController.createPost);
postsRouter.put("/:id", postsController.updateUser);
postsRouter.delete("/:id", postsController.deleteUser);


module.exports = postsRouter;