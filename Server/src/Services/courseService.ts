import { Basecourse } from "../models/Basecourse";
import { Subtopic } from "../models/Subtopic";
<<<<<<< HEAD
import { Problem } from "../models/Problem";
=======
import { Problem } from "../models/Problem"; // Add the Problem model
>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205

class CourseService {
  async createCourseWithSubtopics(data: any) {
    const { title, description, category, phase, subtopics } = data;

<<<<<<< HEAD
    const course = new Basecourse({ title, description, category, phase });
=======
    const course = new Basecourse({
      title,
      description,
      category,
      phase
    });

>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205
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
<<<<<<< HEAD

    const course = new Basecourse({ title, description, category, phase });
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
          category: problem.category,
        });
        return await newProblem.save();
      })
    );

    savedCourse.problems = createdProblems.map((p) => p._id);
    await savedCourse.save();

    return savedCourse;
  }

  
  async getAllCourses() {
    return await Basecourse.find()
      .populate("subtitle")
      .populate("problems");
=======

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
>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205
  }
}

<<<<<<< HEAD
  
  async getCourseById(id: string) {
    return await Basecourse.findById(id)
      .populate("subtitle")
      .populate("problems");
  }
}

=======
>>>>>>> f4a334fb01722329a53073f4039cc1225d09b205
export default new CourseService();
