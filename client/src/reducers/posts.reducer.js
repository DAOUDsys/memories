import { postsActionTypes } from "../constants/action_types";
// when we dispatch an action it will be received here because this reducer is used in combine reducer
/// [state] is posts data
const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case postsActionTypes.START_LOADING:
      return { ...state, isLoading: true };
    case postsActionTypes.STOP_LOADING:
      return { ...state, isLoading: false };
    case postsActionTypes.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case postsActionTypes.SEARCH:
      return {
        ...state,
        posts: action.payload,
        searchResult: action.payload,
      };
    case postsActionTypes.FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case postsActionTypes.CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case postsActionTypes.UPDATE:
    case postsActionTypes.LIKE:
    case postsActionTypes.ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case postsActionTypes.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export default postsReducer;
