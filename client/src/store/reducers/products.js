export default (state = { isLoadingProducts: false, products: [] }, action) => {
  switch (action.type) {
    case "START_LOADING_FETCH_PRODUCTS":
      return { ...state, isLoadingProducts: true };
    case "STOP_LOADING_FETCH_PRODUCTS":
      return { ...state, isLoadingProducts: false };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "FETCH_PRODUCTS":
      return { ...state, products: [...state.products, ...action.payload] };
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
