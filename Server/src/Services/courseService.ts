import { Basecourse } from "../models/Basecourse";
import { Subtopic } from "../models/Subtopic";
import { Problem } from "../models/Problem"; // Add the Problem model

class CourseService {
  async createCourseWithSubtopics(data: any) {
    const { title, description, category, phase, subtopics } = data;

    const course = new Basecourse({
      title,
      description,
      category,
      phase
    });

    const savedCourse = await course.save();

    const createdSubtopics = await Promise.all(
      subtopics.map(async (sub: any) => {
        const newSub = new Subtopic({
          basecourseId: savedCourse._id,
          title: sub.subtopic,
          notes: sub.notes,
          videos: sub.videos,
          assignments: sub.assignments
        });
        return await newSub.save();
      })
    );

    savedCourse.subtitle = createdSubtopics.map((s) => s._id);
    await savedCourse.save();

    return savedCourse;
  }

  async createCourseWithProblems(data: any) {
    const { title, description, category, phase, problems } = data;

    const course = new Basecourse({
      title,
      description,
      category,
      phase
    });

    const savedCourse = await course.save();

    const createdProblems = await Promise.all(
      problems.map(async (problem: any) => {
        const newProblem = new Problem({
          basecourseId: savedCourse._id,
          title: problem.title,
          description: problem.description,
          difficulty: problem.difficulty,
          problemLink: problem.problemLink,
          videoLink: problem.videoLink,
          category:problem.category,
          
        });
        return await newProblem.save();
      })
    );

    savedCourse.problems = createdProblems.map((problem: any) => problem._id);
    await savedCourse.save();

    return savedCourse;
  }
}

export default new CourseService();
