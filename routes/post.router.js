const express = require("express");
const { getPost, createPost, updatePost, deletePost } = require("../controller/post.controller");


const postRouter = express.Router();

postRouter.get("/", getPost);
postRouter.post("/create", createPost);
postRouter.patch("/update/:id", updatePost);
postRouter.delete("/delete/:id", deletePost);

module.exports = { postRouter }