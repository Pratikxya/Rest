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
});

const commentModel = mongoose.model("Comments", CommentSchema);
export default commentModel;
