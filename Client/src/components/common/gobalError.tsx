'use client';
import { useEffect, useState } from 'react';
import { useError } from '../../context/errorContext';

const GlobalError = () => {
  const { error, setError } = useError();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setError(null);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (!error) return null;
  return (
    <div
      className={`
        fixed top-4 right-4 
        bg-red-600 text-white 
        px-6 py-3 rounded-lg 
        z-[9999]  
        shadow-lg shadow-red-700/80
        transform transition-all duration-200
        animate-pulse
        flex items-center
      `}
      style={{ boxShadow: '0 0 10px 3px rgba(220, 38, 38, 0.8)' }} // extra glow effect
    >
      <span className="font-semibold text-lg select-none">{error}</span>
      <button
        onClick={() => setError(null)}
        className="
          ml-6 font-bold text-white 
          hover:text-red-300 
          transition-colors duration-200
          focus:outline-none
          text-xl
          "
        aria-label="Close error message"
      >
        ✕
      </button>
    </div>
  );
};

export default GlobalError;
