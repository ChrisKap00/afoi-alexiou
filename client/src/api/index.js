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
export const addSubCategory = (item) => API.post("/products/addSubCategory", item);
