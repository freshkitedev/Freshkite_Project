import React from 'react';

interface VideoPlayerPopupProps {
  topic: string;
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoPlayerPopup: React.FC<VideoPlayerPopupProps> = ({ topic, videoUrl, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 inline-block px-10 py-1 border border-red-500 rounded-md hover:bg-red-500 hover:text-slate-50 transition duration-300"
        >
          Close
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {topic}
        </h2>
        <div className="w-full aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full rounded-lg"
            src={videoUrl}
            title={topic}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPopup;
