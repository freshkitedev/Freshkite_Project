module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust paths according to your folder structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode:"class",
}

