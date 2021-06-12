import express from "express";
const router = express.Router();
import PostModel from "../models/post.js";

// GET BACK ALL THE POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find().populate({
      path: "comments",
      select: ["id", "comment"],
    });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMITS A POST
router.post("/", async (req, res) => {
  const post = new PostModel({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC POST
router.get("/:postId", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete Post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await PostModel.remove({ _id: req.params.postId });
    res.json({ message: "Deleted Succesfully" });
  } catch (err) {
    res.json({ message: err });
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
    res.json({ message: err });
  }
});

export default router;
