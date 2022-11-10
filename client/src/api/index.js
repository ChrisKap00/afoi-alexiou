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
