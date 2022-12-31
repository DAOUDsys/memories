import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  comments: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  selectedFile: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModule = mongoose.model("PostModule", postSchema);
export default PostModule;
