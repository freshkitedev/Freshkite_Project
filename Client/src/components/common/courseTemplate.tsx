
import { useRouter } from 'next/router';
import React from 'react';

interface CourseTemplateProps {
  title: string;
  description: string;
  image: string;
  Link: string;
}
const CourseTemplate: React.FC<CourseTemplateProps> = ({ title, description, image, Link }) => {
  const router = useRouter();
  const handleNav = () => {
    router.push(Link)
  }
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 w-80">
      <div className="rounded-md mb-4">
        <img src={image} alt={title} className="rounded-md" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-400">{description}</p>
      <div className="flex justify-center items-center mt-4">
        <span className="inline-block px-6 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition duration-300" onClick={handleNav}>View Content</span>
      </div>
    </div>
  );
};

export default CourseTemplate;
