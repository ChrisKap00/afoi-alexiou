import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/products";

const store = configureStore({
  reducer: { products },
});

export default store;
