import express from "express";
const router = express.Router();
import User from "../models/User.js";

// GET BACK ALL THE USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMITS A USERRRR
router.post("/", async (req, res) => {
  const user = new User({
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
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete USER
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.json({ message: "Deleted Succesfully" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a USER

router.patch("/:userId", async (req, res) => {
  try {
    const updateUser = await User.updateOne(
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
    res.json({ message: err });
  }
});

export default router;
