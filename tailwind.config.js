/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'text': '#eed7f7',
        'background': '#15061a',
        'primary': '#d691e8',
        'secondary': '#931f4c',
        'accent': '#d32d40',
      },
      colors: {
        'text': '#dbe7f8',
        'background': '#040b12',
        'primary': '#8bb6e9',
        'secondary': '#441a85',
        'accent': '#a82cd6',
       },       
    }
  },
}