import {
  fetchPosts,
  fetchPost,
  createPostApi,
  updatePostApi,
  deletePostApi,
  likePostApi,
  fetchposts,
  pushComment,
} from "../api/api_controller";
import { postsActionTypes } from "../constants/action_types";
// action creators
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: postsActionTypes.START_LOADING });
    // [fetchPosts] is the function that we use in api controller to fetch data from our backend api
    const { data } = await fetchPosts(page);
    // { type: "FETCH_ALL", payload: data } this is the action that we return it to reducer and
    // use it in posts reducer when type matches the switch statement case
    // we dispatch it means that we send it to reducer
    dispatch({ type: postsActionTypes.FETCH_ALL, payload: data });
    dispatch({ type: postsActionTypes.STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: postsActionTypes.START_LOADING });

    const { data } = await fetchPost(id);

    dispatch({ type: postsActionTypes.FETCH_POST, payload: data });
    dispatch({ type: postsActionTypes.STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};
// form data is the data that we get from the create post form
export const createPost = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: postsActionTypes.START_LOADING });
    const { data } = await createPostApi(formData);
    navigate(`/posts/${data._id}`);
    dispatch({ type: postsActionTypes.CREATE, payload: data });
    dispatch({ type: postsActionTypes.STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, formData) => async (dispatch) => {
  try {
    const { data } = await updatePostApi(id, formData);
    dispatch({ type: postsActionTypes.UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await deletePostApi(id);

    dispatch({ type: postsActionTypes.DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await likePostApi(id);
    dispatch({ type: postsActionTypes.LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const searchPosts = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: postsActionTypes.START_LOADING });
    const {
      data: { data },
    } = await fetchposts(searchQuery);
    dispatch({ type: postsActionTypes.SEARCH, payload: data });
    dispatch({ type: postsActionTypes.STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};
export const addComment = (comment, id) => async (dispatch) => {
  try {
    const { data } = await pushComment(comment, id);
    dispatch({ type: postsActionTypes.ADD_COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
