import express from "express";
import { signin, postCategories } from "../controllers/admin.js";

const router = express.Router();

router.post("/signin", signin);
// router.post("/cat", postCategories);
// router.post("/signup", signup);

export default router;
