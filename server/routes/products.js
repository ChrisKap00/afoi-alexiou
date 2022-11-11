import express from "express";
import { fetchCategories, deleteById } from "../controllers/products.js";

const router = express.Router();

router.get("/fetchCategories", fetchCategories);
router.patch("/delete", deleteById);
// router.post("/signup", signup);

export default router;
