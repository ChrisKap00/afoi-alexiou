import * as api from "../../api";

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: "START_LOADING_FETCH_CATEGORIES" });
  try {
    const { data } = await api.fetchCategories();
    console.log(data);
    dispatch({ type: "FETCH_CATEGORIES", payload: data.categories });
  } catch (error) {}
  dispatch({ type: "STOP_LOADING_FETCH_CATEGORIES" });
};
