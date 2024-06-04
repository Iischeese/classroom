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
        "text": "#FDFCDC",
        "background": "#14120B",
        "primary": "#78B3FF",
        "secondary": "#27476E",
        "accent": "#EE4266"
      }
    }
  },
}