import express from "express";
import { signin, postCategories, deleteAllCategories } from "../controllers/admin.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/cat", postCategories);
router.patch("/catDel", deleteAllCategories);
// router.post("/signup", signup);

export default router;
