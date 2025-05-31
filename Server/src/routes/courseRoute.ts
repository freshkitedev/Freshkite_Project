import express from "express";
import CourseController from "../controllers/courseController";

const router = express.Router();

router.post("/courses", CourseController.createCourse);
router.get("/courses", CourseController.getAllCourses);
router.get("/courses/:id", CourseController.getCourseById);

export default router;
