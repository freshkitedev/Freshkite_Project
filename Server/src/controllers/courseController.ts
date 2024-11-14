import { Request, Response } from "express";
import * as courseService from "../Services/courseService";

// Controller function to get basic course info (title, description, image)
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await courseService.getBasicCourseInfo();
    res.status(200).json(courses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get full course details by ID
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const requestedFields = req.query.fields as string;
    const course = await courseService.getCourseDetailsById(req.params.id, requestedFields);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to create a new course
export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error: any) {
    if (error.message === "Course with this title already exists.") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Controller function to update a course by ID
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    res.status(200).json(updatedCourse);
  } catch (error: any) {
    if (error.message === "Course not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Controller function to delete a course by ID
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const deletedCourse = await courseService.deleteCourse(req.params.id);
    res.status(200).json({ message: "Course deleted", course: deletedCourse });
  } catch (error: any) {
    if (error.message === "Course not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
