/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["media"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  safelist: [
    {
      'pattern': /grid-cols-.+/
    },
    {
      'pattern': /grid-rows-.+/
    }
  ],
  theme: {
    extend: {
      screens: {
        'md': '876px'
      },
      borderRadius: {
        'md': '.3rem'
      },
      boxShadow: {
        'md': '0px 0px 5px 8px #fff'
      },
      // light
      colors: {
        'text': '#09080b',
        'background': '#f4f2f8',
        'primary': '#6e00ff',
        'secondary': '#b48ee6',
        'accent': '#9655eb',
      },
      //  Purple
      colors: {
        'text': '#f0e7fd',
        'background': '#0a0213',
        'primary': '#6e00ff',
        'secondary': '#990e5b',
        'accent': '#ee416e',
       },
      //  Green
       colors: {
        'text': '#e8f6e0',
        'background': '#131e09',
        'primary': '#aadc8b',
        'secondary': '#26815a',
        'accent': '#3cc5b8',
       },
      //  Blue
      colors: {
        'text': '#e4faf3',
        'background': '#020b08',
        'primary': '#83e6c8',
        'secondary': '#1d6192',
        'accent': '#2f71d6',
        'yellow': '#FFCB47',
        'orange': '#E4572E',
        'red': '#EF2D56'
       },
       
    }
  },
}