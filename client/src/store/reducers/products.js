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
      return { ...state, categories: action.payload.categories };
    default:
      return state;
  }
};
