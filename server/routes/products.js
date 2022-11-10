import express from "express";
import { fetchCategories } from "../controllers/products.js";

const router = express.Router();

router.get("/fetchCategories", fetchCategories);
// router.post("/signup", signup);

export default router;
