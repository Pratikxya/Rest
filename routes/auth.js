import { Router } from "express";
const router = Router();

import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { registerValidation, loginValidation } from "./validation.js";

router.post("/register", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE MAKE A USER

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email  is already in the database
  const emailExist = await userModel.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user

  const user = new userModel({
    email: req.body.email,
    password: hashedPassword,
    age: req.body.age,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE MAKE A USER

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Checking if the email exists
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");
  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, "secrettttttt");

  res.header("auth-token", token).send(token);

  // res.send("Successfully logged in !");
});

export default router;
