export default (
  state = {
    isLoadingCategories: false,
    isLoadingDelete: false,
    isLoadingProducts: false,
    categories: [],
  },
  action
) => {
  switch (action.type) {
    case "START_LOADING_FETCH_CATEGORIES":
      return { ...state, isLoadingCategories: true };
    case "STOP_LOADING_FETCH_CATEGORIES":
      return { ...state, isLoadingCategories: false };
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload };
    case "START_LOADING_UPDATE":
      return { ...state, isLoadingDelete: true };
    case "STOP_LOADING_UPDATE":
      return { ...state, isLoadingDelete: false };
    case "UPDATE":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
      };
    default:
      return state;
  }
};
