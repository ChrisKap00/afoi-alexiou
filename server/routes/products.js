import express from "express";
import {
  fetchCategories,
  deleteById,
  addSubCategory,
  addProduct,
  fetchProducts,
  deleteProduct,
  editProduct,
  fetchProduct,
  fetchRecommendedProducts,
  searchProducts,
} from "../controllers/products.js";

const router = express.Router();

router.get("/fetchCategories", fetchCategories);
router.patch("/delete", deleteById);
router.post("/addSubCategory", addSubCategory);
// router.post("/signup", signup);
router.post("/addProduct", addProduct);
router.get("/fetch", fetchProducts);
router.patch("/deleteProduct", deleteProduct);
router.patch("/editProduct", editProduct);
router.get("/fetchOne", fetchProduct);
router.get("/fetchRecommended", fetchRecommendedProducts);
router.get("/search", searchProducts);

export default router;
