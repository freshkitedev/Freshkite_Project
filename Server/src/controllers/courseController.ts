import { Request, Response } from "express";
<<<<<<< HEAD
import CourseService from "../Services/courseService"; 

class CourseController {
  
  // Create a new course
=======
import CourseService from "../Services/CourseService"; // Adjust the path to your service layer

class CourseController {
  
>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205
  async createCourse(req: Request, res: Response) {
    try {
      const data = req.body;

<<<<<<< HEAD
=======
      
>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205
      if (!data.category || !['web', 'problem'].includes(data.category)) {
        return res.status(400).json({ message: "Invalid category. Should be 'web' or 'problem'." });
      }

      let savedCourse;

<<<<<<< HEAD
      if (data.category === 'web') {
        savedCourse = await CourseService.createCourseWithSubtopics(data);
      } else if (data.category === 'problem') {
=======
      
      if (data.category === 'web') {
        savedCourse = await CourseService.createCourseWithSubtopics(data);
      }
      
      else if (data.category === 'problem') {
>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205
        savedCourse = await CourseService.createCourseWithProblems(data);
      }

      return res.status(201).json(savedCourse);
    } catch (err) {
      console.error("Error creating course:", err);
      return res.status(500).json({ message: "Failed to create course", error: err });
    }
  }
<<<<<<< HEAD

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

=======
}

>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205
export default new CourseController();
