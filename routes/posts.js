import express from "express";
const router = express.Router();
import PostModel from "../models/post.js";
import UserModel from "../models/user.js";
import CommentModel from "../models/comment.js";

// GET BACK ALL THE POSTS
router.get("/", async (req, res) => {
  let query = {};
  req.query.search &&
    (query.title = { $regex: new RegExp(req.query.search), $options: "i" });

  try {
    const posts = await PostModel.find(query).populate({
      path: "user",
      select: ["email"],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SUBMITS A POST
router.post("/", async (req, res) => {
  const post = new PostModel({
    title: req.body.title,
    description: req.body.description,
    user: req.body.userId,
  });
  try {
    const savedPost = await post.save();
    const user = await UserModel.findOne({ _id: req.body.userId });
    user.posts.push(savedPost);
    user.save();

    res.json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//SPECIFIC POST
router.get("/:postId", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId)
      .populate({
        path: "comments",
        populate: { path: "user", select: ["email"] },
      })
      .populate({ path: "user", select: ["email"] });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:postId/comment", async (req, res) => {
  const comment = new CommentModel({
    comment: req.body.comment,
    post: req.params.postId,
    user: req.body.userId,
  });
  try {
    const savedComment = await comment.save();
    const post = await PostModel.findOne({ _id: req.params.postId });
    res.json(savedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//Delete Post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await PostModel.remove({ _id: req.params.postId });
    res.json({ message: "Deleted Succesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update a post

router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await PostModel.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    res.json({ message: "Updated Succesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
