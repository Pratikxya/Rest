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
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const commentModel = mongoose.model("Comments", CommentSchema);
export default commentModel;
