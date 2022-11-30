import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/admin/signin", formData);
export const signUp = (formData) => API.post("/admin/signup", formData);

export const fetchCategories = () => API.get("/products/fetchCategories");

export const sendCategories = (categories) =>
  API.post("/admin/cat", categories);
export const deleteAllCategories = () => API.patch("admin/catDel");

export const deleteById = (item) => API.patch("/products/delete", item);
export const addSubCategory = (item) =>
  API.post("/products/addSubCategory", item);
export const addProduct = (item) => API.post("/products/addProduct", item);
export const fetchProducts = (params) =>
  API.get("/products/fetch", {
    params: {
      ids: params.ids,
      type: params.type,
      manufacturer: params.manufacturer,
      page: params.page,
    },
  });
export const deleteProduct = (id) => API.patch("/products/deleteProduct", id);
export const editProduct = (data) => API.patch("/products/editProduct", data);
export const fetchProduct = (id) =>
  API.get("/products/fetchOne", {
    params: id,
  });
export const fetchRecommendedProducts = (ids) =>
  API.get("/products/fetchRecommended", {
    params: ids,
  });
export const searchProducts = (query) =>
  API.get("/products/search", {
    params: query,
  });
