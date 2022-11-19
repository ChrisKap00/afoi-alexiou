import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/products";
import categories from "./reducers/categories";
import admin from "./reducers/admin";

const store = configureStore({
  reducer: { products, categories, admin },
});

export default store;
