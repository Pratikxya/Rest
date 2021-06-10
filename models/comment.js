import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
});

const commentModel = mongoose.model("Comments", CommentSchema, "comments");
export default commentModel;
