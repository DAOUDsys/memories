import { authActionTypes } from "../constants/action_types";

const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case authActionTypes.AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return { ...state, authData: action?.data, loading: false, errors: null };
        case authActionTypes.LOGOUT:
            localStorage.clear();
            return { ...state, authData: null};
    
        default:
            return state;
    }
};

export default authReducer;