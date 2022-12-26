import {signInApi, signUpApi} from '../api/api_controller';
import { authActionTypes } from "../constants/action_types";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await signInApi(formData);

    dispatch({ type: authActionTypes.AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};
export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await signUpApi(formData);

    dispatch({ type: authActionTypes.AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};
