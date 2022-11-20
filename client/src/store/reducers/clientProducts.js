export default (
  state = { isLoadingClientProducts: false, clientProducts: [] },
  action
) => {
  switch (action.type) {
    case "START_LOADING_FETCH_CLIENT_PRODUCTS":
      return { ...state, isLoadingClientProducts: true };
    case "STOP_LOADING_FETCH_CLIENT_PRODUCTS":
      return { ...state, isLoadingClientProducts: false };
    case "FETCH_CLIENT_PRODUCTS": {
      const productsTemp = [];
      for (const product of action.payload) {
        if (!state.clientProducts.find((e) => e._id === product._id)) {
          productsTemp.push(product);
        }
      }
      return {
        ...state,
        clientProducts: [...state.clientProducts, ...productsTemp],
      };
    }

    default:
      return state;
  }
};
