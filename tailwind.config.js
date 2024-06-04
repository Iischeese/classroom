/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["media"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        'md': '.3rem'
      },
      colors: {
        "text": "#F9E7CF",
        "background": "#0F0803",
        "primary": "#fbc531",
        "secondary": "#dbb521",
        "accent": "#fbc531"
      }
    }
  },
}