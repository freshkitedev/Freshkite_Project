import Navbar from "@/src/components/common/navbar";
import Video from "@/src/components/common/video/Video";

interface CourseContentProps {
  topics: string[];
  subtopics: { title: string; englishVid: string; tamilVid: string; notesLink: string }[];
  onChangeTopic: (topic: string) => void;
  onSelectSubtopic: (index: number) => void;
  englishVideo: string;
  tamilVideo: string;
  notesLink: string;
  selectedTopicIndex: number | null;
}

const CourseContent: React.FC<CourseContentProps> = ({
  topics,
  subtopics,
  onChangeTopic,
  onSelectSubtopic,
  englishVideo,
  tamilVideo,
  notesLink,
  selectedTopicIndex,
}) => {
  return (
    <div className="bg-slate-200 dark:bg-slate-900 min-h-screen">
      <Navbar />
      <div className="flex">
        <aside className="w-56 bg-gray-100 dark:bg-gray-800 p-2 border-r border-gray-300 dark:border-gray-700 h-screen flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Tutorial</h2>
          <div className="h-[calc(100vh-60px)] overflow-y-scroll no-scrollbar">
            <ul className="space-y-2 text-base">
              {subtopics.map((topic, index) => (
                <li
                  key={index}
                  onClick={() => onSelectSubtopic(index)}
                  className={`text-gray-600 dark:text-gray-300 p-2 cursor-pointer rounded-lg ${
                    selectedTopicIndex === index ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {topic.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="flex flex-col items-center w-full px-4 py-8">
          {/* Dynamic Topics Navigation */}
          <nav className="bg-transparent dark:bg-transparent rounded-full p-4 border border-gray-300 dark:border-gray-700 shadow-md max-w-6xl w-full mb-8">
            <div className="flex justify-center space-x-8 lg:space-x-20">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  onClick={() => onChangeTopic(topic.toLowerCase())}
                  className="text-lg lg:text-xl font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  {topic}
                </span>
              ))}
            </div>
          </nav>

          {selectedTopicIndex !== null ? (
            <div className="container mx-auto py-8">
              <h2 className="text-2xl font-bold text-center mb-8">Language-Specific Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <div className="video-card flex justify-center">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">English Video</h3>
                    <Video topic={subtopics[selectedTopicIndex].title} videoUrl={englishVideo} />
                  </div>
                </div>
                <div className="video-card flex justify-center">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">Tamil Video</h3>
                    <Video topic={subtopics[selectedTopicIndex].title} videoUrl={tamilVideo} />
                  </div>
                </div>
              </div>
              <div className="text-center mt-8 mb-4 border-t border-gray-300 dark:border-gray-700 pt-8">
                <h2 className="text-2xl font-bold mb-4">Notes</h2>
                <a href={notesLink} target="_blank" rel="noopener noreferrer">
                  <button className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg transition-all duration-200">
                    View Notes
                  </button>
                </a>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">Select a topic to view the video.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
