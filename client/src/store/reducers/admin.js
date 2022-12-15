export default (
    state = { isLoading: false, admin: JSON.parse(localStorage.getItem("admin")) },
    action
  ) => {
    switch (action.type) {
      case "ADMIN_AUTH":
        localStorage.setItem("admin", JSON.stringify({ ...action?.payload }));
        return { ...state, admin: action?.payload };
      case "ADMIN_LOGOUT":
        localStorage.removeItem("admin");
        return { ...state, admin: null };
      case "START_LOADING_ADMIN_AUTH":
        return { ...state, isLoading: true };
      case "STOP_LOADING_ADMIN_AUTH":
        return { ...state, isLoading: false };
      default:
        return state;
    }
  };
  