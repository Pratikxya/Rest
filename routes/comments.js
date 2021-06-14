import express from "express";
const router = express.Router();
import CommentModel from "../models/comment.js";
import PostModel from "../models/post.js";
import UserModel from "../models/user.js";

// GET BACK ALL THE COMMENTS
router.get("/", async (req, res) => {
  try {
    const comments = await CommentModel.find().populate({
      path: "user",
      select: ["email"],
    });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SUBMITS A COMMENT
router.post("/", async (req, res) => {
  const comment = new CommentModel({
    comment: req.body.comment,
    post: req.body.postId,
    user: req.body.userId,
  });
  try {
    const savedComment = await comment.save(); //saved the comment
    const post = await PostModel.findOne({ _id: req.body.postId }); //finding the post for which the comment has to be created
    post.comments.push(savedComment); //add that comment to the original post
    post.save(); //save the post with added comment
    res.json(savedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//SPECIFIC COMMENT
router.get("/:commentId", async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId).populate({
      path: "user",
      select: ["email"],
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete COMMENT
router.delete("/:commentId", async (req, res) => {
  try {
    const removedComment = await CommentModel.remove({
      _id: req.params.commentId,
    });
    res.json({ message: "Deleted Succesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update a COMMENT

router.patch("/:commentId", async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    comment.comment = req.body.comment;
    const updatedComment = comment.save();
    res.json({ message: "Updated Succesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
