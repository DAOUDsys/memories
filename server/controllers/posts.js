import mongoose from "mongoose";
import PostModule from "../models/posts_message.js";
// @desc     Get posts
// @route    GET /posts
// @access   Public
export const getPosts = async (req, res) => {
  try {
    const data = await PostModule.find();
    
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// @desc     Create post
// @route    Post /posts
// @access   Public
export const createPosts = async (req, res) => {
  const body = req.body;
  const newPost = await PostModule.create(body);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// @desc     Update post
// @route    PUT /posts:id
// @access   Public
export const updatePost = async (req, res) => {
  const id = req.params.id; // it can be like => const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("there is no post with this id");
  }
  try {
    await PostModule.findByIdAndUpdate(id, { ...req.body, id }, { new: true });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// @desc     Delete post
// @route    DELETE /posts:id
// @access   Public
export const deletePost = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send("there is no post with this id");
  }
  try {
    await PostModule.findByIdAndRemove(id);
    res.status(200).json({});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// @desc     Like post
// @route    PUT /posts:id/likepost
// @access   Public
export const likePost = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send("there is no post with this id");
  }
  try {
  const post = await PostModule.findById(id);
  await PostModule.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})
    res.status(200).json({});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
