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
        text: "#e1e9fc",
        background: "#020718",
        secondary: "#33447b",
        primary: "#87a3f4",
        accent: "#eb1876",
      }
    },
  },
  plugins: [],
};
