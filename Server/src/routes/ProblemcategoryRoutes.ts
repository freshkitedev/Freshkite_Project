
import express from "express";
<<<<<<< HEAD
import {getProblemsByCategory} from "../controllers/ProblemcategoryController"
=======
import { getProblemsByCategory } from "../controllers/ProblemcategoryController";
>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205

const router = express.Router();


router.get("/category/:category", getProblemsByCategory);

export default router;
