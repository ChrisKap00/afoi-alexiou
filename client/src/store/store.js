import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/products";
import admin from "./reducers/admin";

const store = configureStore({
  reducer: { products, admin },
});

export default store;
