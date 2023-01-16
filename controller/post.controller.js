const Post = require("../model/post.model")
const jwt = require("jsonwebtoken");
require("dotenv").config()

const getPost = async (req, res) => {
    const { device, device1, device2, device3 } = req.query;
    const yourPost = req.body.userID;
    try {
        const queryObject = { useID: yourPost }

        if (device) queryObject.device = device
        if (device1) queryObject.device1 = device1
        if (device2) queryObject.device2 = device2
        if (device3) queryObject.device3 = device3

        const userPost = await Post.find(queryObject)
        res.send(userPost);
    } catch (error) {
        console.log("Data could not be retrieved");
        res.send(error);
    }
}

const createPost = async (req, res) => {
    const newPost = req.body;
    try {
        const addPost = new Post(newPost);
        await addPost.save();
        res.send("Post created successfully")
    } catch (error) {
        console.log("Cannot create post")
        res.send(error)
    }
}


const updatePost = async (req, res) => {
    const postData = req.body;
    const id = req.params.id;
    const post = Post.findOne({ _id: id });
    const post_userid = post.userID;
    const post_req = req.body.userID;

    try {
        if (post_req !== post_userid) {
            console.log("Your are not allowed to access");
            res.send("Your are not allowed to access")
        }
        else {
            await Post.findByIdAndUpdate({ _id: id }, postData, { new: true })
            res.send("Post updated successfully")
        }
    } catch (error) {
        console.log(error);
        res.send("Error updating")
    }

}

const deletePost = async (req, res) => {
    const postData = req.body;
    const id = req.params.id;
    const post = Post.findOne({ _id: id });
    const post_userid = post.userID;
    const post_req = req.body.userID;

    try {
        if (post_req !== post_userid) {
            console.log("Your are not allowed to access");
            res.send("Your are not allowed to access")
        }
        else {
            await Post.findByIdAndDelete({ _id: id }, postData, { new: true })
            res.send("Post Deleted successfully")
        }
    } catch (error) {
        console.log(error);
        res.send("Error Deleting")
    }
}

module.exports = { getPost, createPost, updatePost, deletePost }