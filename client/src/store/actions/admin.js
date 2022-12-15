import * as api from "../../api";

export const signin = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "START_LOADING_ADMIN_AUTH" });
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: "ADMIN_AUTH", payload: data });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "STOP_LOADING_ADMIN_AUTH" });
};

export const signup = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "START_LOADING_ADMIN_AUTH" });
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: "ADMIN_AUTH", payload: data });
    navigate(0);
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "STOP_LOADING_ADMIN_AUTH" });
};
