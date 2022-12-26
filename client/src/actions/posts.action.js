import {
  fetchPosts,
  createPostApi,
  updatePostApi,
  deletePostApi,
  likePostApi,
  fetchSearchedPosts
} from "../api/api_controller";
import { postsActionTypes } from "../constants/action_types";
// action creators
export const getPosts = () => async (dispatch) => {
  try {
    // [fetchPosts] is the function that we use in api controller to fetch data from our backend api
    const { data } = await fetchPosts();
    // { type: "FETCH_ALL", payload: data } this is the action that we return it to reducer and
    // use it in posts reducer when type matches the switch statement case
    // we dispatch it means that we send it to reducer
    dispatch({ type: postsActionTypes.FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
// form data is the data that we get from the create post form
export const createPost = (formData) => async (dispatch) => {
  try {
    const { data } = await createPostApi(formData);
    dispatch({ type: postsActionTypes.CREATE, payload: data });
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
    const { data: {data} } = await fetchSearchedPosts(searchQuery);
    dispatch({ type: postsActionTypes.SEARCH, payload: data });
    
  } catch (error) {
    console.log(error);
  }
};
