import express from "express";
import CourseController from "../controllers/CourseController"; 
import { verifyToken } from "../middleware/verifyUser"; 

const router = express.Router();


router.post("/", CourseController.createCourse);


export default router;
