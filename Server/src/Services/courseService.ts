import { Course } from "../models/course";

// Get basic course info (title, description, image)
export const getBasicCourseInfo = async () => {
  return await Course.find().select("title description imagePath");
};

// Service function to get course details by ID with specific fields
export const getCourseDetailsById = async (courseId: string, fields?: string) => {
  let selectFields = "title"; // Include title by default
  if (fields) {
    selectFields += " " + fields.split(",").join(" ");
  }

  return await Course.findById(courseId).select(selectFields);
};

// Create a new course, ensuring the title is unique
export const createCourse = async (courseData: any) => {
  // Check if a course with the same title already exists
  const existingCourse = await Course.findOne({ title: courseData.title });
  
  if (existingCourse) {
    throw new Error("Course with this title already exists.");
  }

  // Create a new course if the title is unique
  return await Course.create(courseData);
};

// Update a course by ID
export const updateCourse = async (courseId: string, courseData: any) => {
  const updatedCourse = await Course.findByIdAndUpdate(courseId, courseData, {
    new: true,
    runValidators: true,
  });
  if (!updatedCourse) {
    throw new Error("Course not found");
  }
  return updatedCourse;
};

// Delete a course by ID
export const deleteCourse = async (courseId: string) => {
  const deletedCourse = await Course.findByIdAndDelete(courseId);
  if (!deletedCourse) {
    throw new Error("Course not found");
  }
  return deletedCourse;
};
