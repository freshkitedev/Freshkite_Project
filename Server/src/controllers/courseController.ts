import { Request, Response } from "express";
import CourseService from "../Services/courseService"; 

class CourseController {
  
  // Create a new course
  async createCourse(req: Request, res: Response) {
    try {
      const data = req.body;

      if (!data.category || !['web', 'problem'].includes(data.category)) {
        return res.status(400).json({ message: "Invalid category. Should be 'web' or 'problem'." });
      }

      let savedCourse;

      if (data.category === 'web') {
        savedCourse = await CourseService.createCourseWithSubtopics(data);
      } else if (data.category === 'problem') {
        savedCourse = await CourseService.createCourseWithProblems(data);
      }

      return res.status(201).json(savedCourse);
    } catch (err) {
      console.error("Error creating course:", err);
      return res.status(500).json({ message: "Failed to create course", error: err });
    }
  }

  // Get all courses
  async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await CourseService.getAllCourses();
      return res.status(200).json(courses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      return res.status(500).json({ message: "Failed to get courses", error: err });
    }
  }

  // Get course by ID
  async getCourseById(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const course = await CourseService.getCourseById(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      return res.status(200).json(course);
    } catch (err) {
      console.error("Error fetching course by ID:", err);
      return res.status(500).json({ message: "Failed to get course", error: err });
    }
  }
}

export default new CourseController();
