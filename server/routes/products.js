import express from "express";
import {
  fetchCategories,
  deleteById,
  addSubCategory,
} from "../controllers/products.js";

const router = express.Router();

router.get("/fetchCategories", fetchCategories);
router.patch("/delete", deleteById);
router.post("/addSubCategory", addSubCategory);
// router.post("/signup", signup);

export default router;
