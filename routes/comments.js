const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// GET BACK ALL THE COMMENTS
router.get("/", async (req, res) => {
  try {
    const Comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMITS A COMMENT
router.comment("/", async (req, res) => {
  const comment = new Comment({
    title: req.body.title,
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
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a COMMENT

router.patch("/:commentId", async (req, res) => {
  try {
    const updateComment = await Comment.updateOne(
      { _id: req.params.commentId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
