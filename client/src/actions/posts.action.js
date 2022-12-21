import { fetchPosts, createPostApi, updatePostApi, deletePostApi, likePostApi } from "../api/api_controller";

// action creators
export const getPosts = () => async (dispatch) => {
  try {
    // [fetchPosts] is the function that we use in api controller to fetch data from our backend api
    const { data } = await fetchPosts();
    // { type: "FETCH_ALL", payload: data } this is the action that we return it to reducer and
    // use it in posts reducer when type matches the switch statement case
    // we dispatch it means that we send it to reducer
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
// form data is the data that we get from the create post form
export const createPost = (formData) => async (dispatch) => {
  try {
    const { data } = await createPostApi(formData);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id,formData) => async (dispatch) => {
  try {
    const { data } = await updatePostApi(id,formData);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await deletePostApi(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const {data} = await likePostApi(id);

    dispatch({ type: 'LIKE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
