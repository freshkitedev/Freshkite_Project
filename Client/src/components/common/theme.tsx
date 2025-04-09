import { useEffect, useState } from "react";

 export default function ToggleTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (storedTheme) {
          setTheme(storedTheme);
          document.documentElement.classList.add(storedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme('dark');
          document.documentElement.classList.add('dark');
        }
      }, []);
      function toggletheme() {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
          }  
      }  

    return(
        <button
        onClick={toggletheme}
        className="p-2 bg-gray-50 dark:bg-gray-800 rounded-full focus:outline-none hover:bg-black-500 transition duration-300"
      >
        {theme === 'light' ? '🌞' : '🌜'}
      </button>
    )
}