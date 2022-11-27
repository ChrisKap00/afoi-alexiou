export default (
  state = { isLoadingFilterChange: false, filter: null, redirected: false },
  action
) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return { ...state, filter: action.payload };
    case "REDIRECT":
      return { ...state, redirected: true };
    case "RESET_REDIRECT":
      return { ...state, redirected: false };
    default:
      return state;
  }
};
