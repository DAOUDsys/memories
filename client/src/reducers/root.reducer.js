import { combineReducers } from "redux";
import postsReducer from "./posts.reducer.js";

// this is the store that have all reducers (global store)
export default combineReducers({
  postsReducer,
});
