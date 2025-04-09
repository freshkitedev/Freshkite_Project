import CourseContent from "@/src/components/common/CourseContent";
import { useState } from "react";

const topics = ["NodeJS", "ReactJS"]; 
type Subtopic = {
  title: string;
  englishVid: string;
  tamilVid: string;
  notesLink: string;
};


const nodeSubtopics: Subtopic[] = [
    {
      title: "NodeJS Basics",
      englishVid: "https://www.youtube.com/embed/yourNodeJSVideo",
      tamilVid: "https://www.youtube.com/embed/yourNodeJSVideoTamil",
      notesLink: "https://example.com/node-basics-notes",
    },
    // Other NodeJS subtopics...
  ];
  
  const reactSubtopics: Subtopic[] = [
    {
      title: "ReactJS Basics",
      englishVid: "https://www.youtube.com/embed/yourReactJSVideo",
      tamilVid: "https://www.youtube.com/embed/yourReactJSVideoTamil",
      notesLink: "https://example.com/react-basics-notes",
    },
    // Other ReactJS subtopics...
  ];

  export default function MernCourse() {
    const [subtopics, setSubtopics] = useState<Subtopic[]>(nodeSubtopics);
    const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(null);
  
    const englishVideo = selectedTopicIndex !== null ? subtopics[selectedTopicIndex].englishVid : "";
    const tamilVideo = selectedTopicIndex !== null ? subtopics[selectedTopicIndex].tamilVid : "";
    const notesLink = selectedTopicIndex !== null ? subtopics[selectedTopicIndex].notesLink : "";
  
    const changeTopic = (newTopic: string) => {
      if (newTopic === "nodejs") setSubtopics(nodeSubtopics);
      else if (newTopic === "reactjs") setSubtopics(reactSubtopics);
      setSelectedTopicIndex(null); // Reset selected topic when changing topics
    };
  
    const selectSubtopic = (index: number) => {
      setSelectedTopicIndex(index);
    };
  
    return (
      <CourseContent
        topics={topics}
        subtopics={subtopics}
        onChangeTopic={changeTopic}
        onSelectSubtopic={selectSubtopic}
        englishVideo={englishVideo}
        tamilVideo={tamilVideo}
        notesLink={notesLink}
        selectedTopicIndex={selectedTopicIndex}
      />
    );
  }
