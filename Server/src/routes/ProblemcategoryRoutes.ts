
import express from "express";
import { getProblemsByCategory } from "../controllers/ProblemcategoryController";

const router = express.Router();


router.get("/category/:category", getProblemsByCategory);

export default router;
