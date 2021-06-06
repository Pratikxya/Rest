const express = require("express");
const router = express.Router();
const user = require("../models/user");

// GET BACK ALL THE USERS
router.get("/", async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMITS A USERRRR
router.post("/", async (req, res) => {
  const user = new user({
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC USER
router.get("/:userId", async (req, res) => {
  try {
    const user = await user.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete USER
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await user.remove({ _id: req.params.userId });
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a USER

router.patch("/:userId", async (req, res) => {
  try {
    const updateUser = await user.updateOne(
      { _id: req.params.userId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
