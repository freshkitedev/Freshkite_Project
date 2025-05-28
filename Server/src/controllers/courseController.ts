import { Request, Response } from "express";
import CourseService from "../Services/CourseService"; // Adjust the path to your service layer

class CourseController {
  
  async createCourse(req: Request, res: Response) {
    try {
      const data = req.body;

      
      if (!data.category || !['web', 'problem'].includes(data.category)) {
        return res.status(400).json({ message: "Invalid category. Should be 'web' or 'problem'." });
      }

      let savedCourse;

      
      if (data.category === 'web') {
        savedCourse = await CourseService.createCourseWithSubtopics(data);
      }
      
      else if (data.category === 'problem') {
        savedCourse = await CourseService.createCourseWithProblems(data);
      }

      return res.status(201).json(savedCourse);
    } catch (err) {
      console.error("Error creating course:", err);
      return res.status(500).json({ message: "Failed to create course", error: err });
    }
  }
}

export default new CourseController();
