export default (
  state = { isLoadingClientProducts: false, clientProducts: [] },
  action
) => {
  switch (action.type) {
    case "START_LOADING_FETCH_CLIENT_PRODUCTS":
      return { ...state, isLoadingClientProducts: true };
    case "STOP_LOADING_FETCH_CLIENT_PRODUCTS":
      return { ...state, isLoadingClientProducts: false };
    default:
      return state;
  }
};
