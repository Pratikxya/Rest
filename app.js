const express = require("express");
const app = express(); // execute express
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//Middlewares
app.use(cors());

app.use(express.json());

//Import Routes
const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");

app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);

//Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Connected to DB !")
);

//start listening to the server

app.listen(3000, () => console.log("Example app listening on the port !"));
