export default (
  state = {
    isLoadingProducts: false,
    isLoadingFetchOne: false,
    isLoadingRecommended: false,
    isLoadingResults: false,
    products: [],
  },
  action
) => {
  switch (action.type) {
    case "START_LOADING_FETCH_PRODUCTS":
      return { ...state, isLoadingProducts: true };
    case "STOP_LOADING_FETCH_PRODUCTS":
      return { ...state, isLoadingProducts: false };
    case "START_LOADING_FETCH_ONE":
      return { ...state, isLoadingProducts: true };
    case "STOP_LOADING_FETCH_ONE":
      return { ...state, isLoadingProducts: false };
    case "START_LOADING_FETCH_RECOMMENDED":
      return { ...state, isLoadingRecommended: true };
    case "STOP_LOADING_FETCH_RECOMMENDED":
      return { ...state, isLoadingRecommended: false };
    case "START_LOADING_FETCH_RESULTS":
      return { ...state, isLoadingResults: true };
    case "STOP_LOADING_FETCH_RESULTS":
      return { ...state, isLoadingResults: false };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "FETCH_PRODUCTS":
      const productsTemp = [];
      for (const product of action.payload) {
        if (!state.products.find((e) => e._id === product._id)) {
          productsTemp.push(product);
        }
      }
      return {
        ...state,
        products: [...state.products, ...productsTemp],
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload.id
            ? action.payload.productData
            : product
        ),
      };
    default:
      return state;
  }
};
