/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: 
  [
    "./src/**/*.{js,jsx,ts,tsx}",
     
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: "#89C43D",
        bg: 'rgb(var(--bg))',
        text: 'rgb(var(--text))',
        surface: 'rgb(var(--surface))',
      },
    },
  },
  plugins: [],
};
