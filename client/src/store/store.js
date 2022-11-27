import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/products";
import clientProducts from "./reducers/clientProducts";
import productsFilter from "./reducers/productsFilter";
import categories from "./reducers/categories";
import admin from "./reducers/admin";

const store = configureStore({
  reducer: { products, clientProducts, productsFilter, categories, admin },
});

export default store;
