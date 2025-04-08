import express from "express";
import { singUp, login, createTeacher } from "../controllers/authController";
import { verifyToken } from "../middleware/verifyUser";

const router = express.Router();

router.post("/signup", singUp);
router.post("/login", login);
router.post("/create-teacher", verifyToken, createTeacher);

export default router;
