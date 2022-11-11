import * as api from "../../api";

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: "START_LOADING_FETCH_CATEGORIES" });
  try {
    const { data } = await api.fetchCategories();
    console.log(data);
    dispatch({ type: "FETCH_CATEGORIES", payload: data.categories });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "STOP_LOADING_FETCH_CATEGORIES" });
};

export const deleteById = (item) => async (dispatch) => {
  console.log("hi");
  dispatch({ type: "START_LOADING_DELETE" });
  try {
    const { data } = await api.deleteById(item);
    console.log(data);
    dispatch({ type: "DELETE", payload: item });
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: "STOP_LOADING_DELETE" });
};
