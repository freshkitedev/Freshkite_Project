import express from "express";
import { createCourseFromDocs } from "../controllers/docToCourseController ";
import { verifyToken } from "../middleware/verifyUser";
import { isAdmin } from "../middleware/VerfiyRole";

const router = express.Router();

router.post("/create-course", verifyToken, isAdmin, createCourseFromDocs);

export default router;
