import { postsActionTypes } from "../constants/action_types";
// when we dispatch an action it will be received here because this reducer is used in combine reducer
/// [state] is posts data
const postsReducer = (state = [], action) => {
  switch (action.type) {
    case postsActionTypes.FETCH_ALL:
      return action.payload;
    case postsActionTypes.CREATE:
      return [...state, action.payload];
    case postsActionTypes.UPDATE:
    case postsActionTypes.LIKE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case postsActionTypes.DELETE:
      return state.filter((post) => post._id !== action.payload._id);
    case postsActionTypes.SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default postsReducer;
