import express from "express";
const router = express.Router();

import UserModel from "../models/user.js";

// GET BACK ALL THE USERS
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().populate({
      path: "posts",
    });
    res.json(users);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// SUBMITS A USER
router.post("/", async (req, res) => {
  const user = new UserModel({
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//SPECIFIC USER
router.get("/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Delete USER
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await UserModel.deleteOne({ _id: req.params.userId });
    res.json({ message: "Deleted Succesfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

//Update a USER

router.patch("/:userId", async (req, res) => {
  try {
    const updateUser = await UserModel.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          age: req.body.age,
        },
      }
    );
    res.json({ message: "Updated Succesfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

export default router;
