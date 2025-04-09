import React, { useState } from "react";
import Video from "@/src/components/common/video/Video"; // Ensure your video component is correctly imported
import Navbar from "@/src/components/common/navbar";

const categories = [
    {
      name: "Arrays & Hashing",
      problems: [
        {
          title: "Valid Palindrome",
          link: "https://www.geeksforgeeks.org/valid-palindrome/",
          difficulty: "Easy" as const,
          videoAvailable: true,
          videoUrl: "https://www.youtube.com/embed/mVvLzmG6Z_Q?si=6x7AGMXmjtlA0GIZ",
        },
        {
          title: "Two Sum II",
          link: "https://www.geeksforgeeks.org/two-sum-ii-input-array-is-sorted/",
          difficulty: "Medium" as const,
          videoAvailable: true,
          videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
        },
        {
          title: "Longest Consecutive Sequence",
          link: "https://www.geeksforgeeks.org/longest-consecutive-subsequence/",
          difficulty: "Hard" as const,
          videoAvailable: false,
        },
      ],
    },
    {
      name: "Two Pointers",
      problems: [
        {
          title: "Container With Most Water",
          link: "https://www.geeksforgeeks.org/container-with-most-water/",
          difficulty: "Medium" as const,
          videoAvailable: true,
          videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
        },
        {
          title: "Trapping Rain Water",
          link: "https://www.geeksforgeeks.org/trapping-rain-water/",
          difficulty: "Hard" as const,
          videoAvailable: true,
          videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
        },
        {
          title: "Remove Duplicates from Sorted Array",
          link: "https://www.geeksforgeeks.org/remove-duplicates-sorted-array/",
          difficulty: "Easy" as const,
          videoAvailable: false,
        },
      ],
    },
    {
      name: "Binary Search",
      problems: [
        {
          title: "Binary Search",
          link: "https://www.geeksforgeeks.org/binary-search/",
          difficulty: "Easy" as const,
          videoAvailable: true,
          videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
        },
        {
          title: "Search in Rotated Sorted Array",
          link: "https://www.geeksforgeeks.org/search-in-rotated-sorted-array/",
          difficulty: "Medium" as const,
          videoAvailable: true,
          videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
        },
        {
          title: "Median of Two Sorted Arrays",
          link: "https://www.geeksforgeeks.org/median-of-two-sorted-arrays/",
          difficulty: "Hard" as const,
          videoAvailable: false,
        },
      ],
    },
  ];
  

interface Problem {
  title: string;
  link: string;
  difficulty: "Easy" | "Medium" | "Hard";
  videoAvailable: boolean;
  videoUrl?: string;
}

interface Category {
  name: string;
  problems: Problem[];
}

interface ProblemCourseTrackerProps {
  categories: Category[];
}

const ProblemCourseTracker: React.FC<ProblemCourseTrackerProps> = ({ categories }) => {
  const [completed, setCompleted] = useState<string[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCompletion = (title: string) => {
    setCompleted((prevCompleted) =>
      prevCompleted.includes(title)
        ? prevCompleted.filter((t) => t !== title)
        : [...prevCompleted, title]
    );
  };

  const toggleCategory = (categoryName: string) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const calculateProgress = (problems: Problem[]) => {
    const completedProblems = problems.filter((p) => completed.includes(p.title)).length;
    return (completedProblems / problems.length) * 100;
  };

  return (
    <div className="bg-slate-200 dark:bg-slate-900 min-h-screen p-4 text-gray-800 dark:text-gray-200">
      <h2 className="text-2xl font-bold text-center mb-4">Problem Course Tracker</h2>

      {/* Categories and Problems */}
      {categories.map((category) => {
        const categoryProgress = calculateProgress(category.problems);

        return (
          <div key={category.name} className="mb-6">
            <div
              onClick={() => toggleCategory(category.name)}
              className="cursor-pointer bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <div className="text-sm font-medium">
                {categoryProgress.toFixed(1)}% completed
              </div>
            </div>

            {/* Progress Bar for Category */}
            <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded-full my-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${categoryProgress}%` }}
              ></div>
            </div>

            {/* Problems List (Dropdown) */}
            {openCategory === category.name && (
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg mt-2">
                {category.problems.map((problem) => (
                  <div
                    key={problem.title}
                    className="flex items-center justify-between p-2 mb-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {/* Completion Checkbox */}
                    <input
                      type="checkbox"
                      checked={completed.includes(problem.title)}
                      onChange={() => toggleCompletion(problem.title)}
                      className="mr-2"
                    />

                    {/* Star Icon */}
                    <span className="text-yellow-500 cursor-pointer mr-2">⭐</span>

                    {/* Problem Title */}
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 hover:text-blue-500"
                    >
                      {problem.title}
                    </a>
                  
                    {/* Difficulty Label */}
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        problem.difficulty === "Easy"
                          ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                          : problem.difficulty === "Medium"
                          ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                          : "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                      }`}
                    >
                      {problem.difficulty}
                    </span>

                    {/* Video Icon */}
                    {problem.videoAvailable && problem.videoUrl && (
                      <button
                        onClick={() => setSelectedProblem(problem)}
                        className="text-blue-500 hover:text-blue-700 ml-2"
                      >
                        📹
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Video Modal for Selected Problem */}
      {selectedProblem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <button onClick={() => setSelectedProblem(null)} className="float-right text-red-500">
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">{selectedProblem.title} - Video</h3>
            <Video topic={selectedProblem.title} videoUrl={selectedProblem.videoUrl ?? "https://default-url.com"} />
          </div>
        </div>
      )}
    </div>
  );
};


export default function App() {
    return (
      <>
        <Navbar />
        <ProblemCourseTracker categories={categories} />
      </>
    );
  }
  