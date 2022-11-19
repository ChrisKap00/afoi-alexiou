import express from "express";
import {
  fetchCategories,
  deleteById,
  addSubCategory,
  addProduct,
  fetchProducts,
  deleteProduct,
  editProduct,
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

export default router;
