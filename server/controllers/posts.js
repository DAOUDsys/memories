import mongoose from "mongoose";
import PostModule from "../models/posts.module.js";

// @desc     Get posts
// @route    GET /posts
// @access   Public
export const getPosts = async (req, res) => {
  const page = req.query.page;
  try {
    const limit = 9;
    const startIndex = (Number(page) - 1) * limit; // get the starting index for every page
    const total = await PostModule.countDocuments({});

    const data = await PostModule.find()
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);

    res
      .status(200)
      .json({
        data,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / limit),
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// @desc     Get post
// @route    GET /posts/:id
// @access   Public
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await PostModule.findById(id);

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// @desc     Create post
// @route    Post /posts
// @access   Public
export const createPosts = async (req, res) => {
  const body = req.body;
  const newPost = await PostModule.create({ ...body, creator: req.userId });
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
  if (!req.userId) {
    return res.status(400).json({ message: "there is no logged in user" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("there is no post with this id");
  }
  try {
    const post = await PostModule.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    // like post
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      // dislike post

      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    await PostModule.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// @desc     Search posts
// @route    GET /posts/search/?searchQuery={}&tags={}
// @access   Public
export const searchPosts = async (req, res) => {
  const search = req.query.searchQuery;
  const tags = req.query.tags;
  try {
    const title = new RegExp(search, "i");
    const posts = await PostModule.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// @desc     Add comment
// @route    Post /posts/:id/comment
// @access   Public
export const addComment = async (req, res) => {
  const comment = req.body.comment;
  const id = req.params.id;
  try {
    const post = await PostModule.findById(id);
    post.comments.push(comment);
    const updatedPost = await PostModule.findByIdAndUpdate(id, post, {new: true});

    res.status(200).json({ data: updatedPost });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
