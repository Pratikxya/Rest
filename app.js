import express, { json } from "express";
const app = express(); // execute express
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
// const port = process.env.port || 3000;

//Middlewares
app.use(cors());
app.use(json());

//Import Routes
import postsRoute from "./routes/posts.js";
import commentsRoute from "./routes/comments.js";
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import verifyRoute from "./routes/verify.js";

//Route Middlewares
app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/users", usersRoute);
app.use("/api/user", authRoute);
app.use("/api/verify", verifyRoute);

//Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB !")
);

//start listening to the server

app.listen(4000, () => console.log("Example app listening on the port !"));
