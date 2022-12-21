// when we dispatch an action it will be received here because this reducer is used in combine reducer
/// [state] is posts data
export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...state, action.payload];
    case "UPDATE":
    case "Like":
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE":
      return state.filter((post) => post._id !== action.payload._id);
    default:
      return state;
  }
};
