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
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostsCollection",
    },
  ],
});

const commentModel = mongoose.model("CommentsCollection", CommentSchema);
export default commentModel;
