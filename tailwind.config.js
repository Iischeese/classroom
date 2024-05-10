/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#e2f4fd',
        'background': '#000305',
        'primary': '#0e93ec',
        'secondary': '#871908',
        'accent': '#b4b70b',
       },
       colors: {
        'text': '#e2e1fe',
        'background': '#000111',
        'primary': '#6d75fc',
        'secondary': '#6204ab',
        'accent': '#cc1bfa',
       },
       
    },
  },
  plugins: [],
};
