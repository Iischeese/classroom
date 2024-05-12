/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Sea Blue
      colors: {
        'text': '#e7f6f9',
        'background': '#040f11',
        'primary': '#5EB1BF',
        'secondary': '#042A2B',
        'accent': '#CDEDF6',
       },
      //  Forest Green
       colors: {
        'text': '#e3ece6',
        'background': '#0c120e',
        'primary': '#61E786',
        'secondary': '#5A5766',
        'accent': '#EDFFEC',
       },
                          
    },
  },
  plugins: [],
};
