import express from "express";
const router = express.Router();
import Comment from "../models/Comment.js";

// GET BACK ALL THE COMMENTS
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMITS A COMMENT
router.post("/", async (req, res) => {
  const comment = new Comment({
    comment: req.body.comment,
  });
  try {
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC COMMENT
router.get("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    res.json(comment);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete COMMENT
router.delete("/:commentId", async (req, res) => {
  try {
    const removedComment = await Comment.remove({ _id: req.params.commentId });
    res.json({ message: "Deleted Succesfully" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a COMMENT

router.patch("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    comment.comment = req.body.comment;
    const updatedComment = comment.save();
    res.json({ message: "Updated Succesfully" });
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
