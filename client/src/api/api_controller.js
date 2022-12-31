import axios from "axios";

const url = "http://localhost:5000";
const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// posts methods
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchposts = (searchQuery) =>
  API.get(
    `/posts/search/s?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPostApi = (newPost) => API.post("/posts", newPost);
export const updatePostApi = (id, oldPost) => API.put(`/posts/${id}`, oldPost);
export const deletePostApi = (id) => API.delete(`/posts/${id}`);
export const likePostApi = (id) => API.put(`/posts/${id}/likepost`);

// auth methods
export const signInApi = (formData) => API.post(`/auth/login`, formData);
export const signUpApi = (formData) => API.post(`/auth/register`, formData);
