import express from "express";
import {
  createPosts,
  deletePost,
  getPosts,
  updatePost,
  likePost,
} from "../controllers/posts.js";

const postRouter = express.Router();

postRouter.route("/").get(getPosts).post(createPosts);
postRouter.route("/:id").patch(updatePost).delete(deletePost);
postRouter.patch('/:id/likepost', likePost)

export default postRouter;
