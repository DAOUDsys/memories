import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPostApi = (newPost) => axios.post(url, newPost);
export const updatePostApi = (id,oldPost) => axios.patch(`${url}/${id}`, oldPost);
export const deletePostApi = (id) => axios.delete(`${url}/${id}`);
export const likePostApi = (id) => axios.patch(`${url}/${id}/likepost`);
