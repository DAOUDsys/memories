import express from "express";
import {
  createPosts,
  deletePost,
  getPosts,
  updatePost,
  likePost,
  searchPosts,
  getPost,
  addComment,
} from "../controllers/posts.js";
import auth from "../middleware/auth.middleware.js";

const postRouter = express.Router();

postRouter.route("/").get(getPosts).post(auth, createPosts);
postRouter.route("/:id").put(auth, updatePost).delete(auth, deletePost).get(getPost);
postRouter.put("/:id/likepost", auth, likePost);
postRouter.get('/search/s', searchPosts);
postRouter.post('/:id/comment', auth, addComment);

export default postRouter;
