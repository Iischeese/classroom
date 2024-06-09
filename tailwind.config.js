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
      screens: {
        'md': '876px'
      },
      borderRadius: {
        'md': '.3rem'
      },
      boxShadow:{
        'md': '0px 0px 5px 8px #fff'
      },
      colors: {
        "text": "#deecff",
        "background": "#0a0d12",
        "primary": "#b6d4fa",
        "secondary": "#3c4a5c65",
        "accent": "#EE4266"
      }
    }
  },
}