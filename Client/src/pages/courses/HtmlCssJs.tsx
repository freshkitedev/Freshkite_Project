import CourseContent from "@/src/components/common/CourseContent";
import { useState } from "react";

const topics = ["HTML", "CSS","JS"];
type Subtopic = {
  title: string;
  englishVid: string;
  tamilVid: string;
  notesLink: string;
};


const htmlSubtopics: Subtopic[] = [
  {
    title: "HTML HOME",
    englishVid: "https://www.youtube.com/embed/mVvLzmG6Z_Q?si=6x7AGMXmjtlA0GIZ",
    tamilVid: "https://www.youtube.com/embed/3lCtfJX8u_M?si=6-HrHBDeqUWuCEJR",
    notesLink: "https://example.com/html-home-notes",
  },
  
];

const cssSubtopics: Subtopic[] = [
  {
    title: "CSS HOME",
    englishVid: "https://www.youtube.com/embed/mVvLzmG6Z_Q?si=g-sbrgv0chVtBn7p",
    tamilVid: "https://www.youtube.com/embed/3lCtfJX8u_M?si=6-HrHBDeqUWuCEJR",
    notesLink: "https://example.com/css-home-notes",
  },

];

const jsSubtopics: Subtopic[] = [
  {
    title: "JavaScript HOME",
    englishVid: "https://www.youtube.com/embed/mVvLzmG6Z_Q?si=g-sbrgv0chVtBn7p",
    tamilVid: "https://www.youtube.com/embed/3lCtfJX8u_M?si=6-HrHBDeqUWuCEJR",
    notesLink: "https://example.com/js-home-notes",
  },

];

export default function HtmlCssJs() {
  const [subtopics, setSubtopics] = useState<Subtopic[]>(htmlSubtopics);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(null);

  // Fetch English, Tamil video URLs, and notes link for the selected subtopic
  const englishVideo = selectedTopicIndex !== null ? subtopics[selectedTopicIndex].englishVid : "";
  const tamilVideo = selectedTopicIndex !== null ? subtopics[selectedTopicIndex].tamilVid : "";
  const notesLink = selectedTopicIndex !== null ? subtopics[selectedTopicIndex].notesLink : "";

  // Function to change topic and update the list of subtopics
  const changeTopic = (newTopic: string) => {
    if (newTopic === "html") setSubtopics(htmlSubtopics);
    else if (newTopic === "css") setSubtopics(cssSubtopics);
    else if (newTopic === "js") setSubtopics(jsSubtopics);
    setSelectedTopicIndex(null); // Reset selected topic when changing topics
  };

  // Function to select a specific subtopic
  const selectSubtopic = (index: number) => {
    setSelectedTopicIndex(index);
  };

  return (
    <CourseContent
      topics = {topics}
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
