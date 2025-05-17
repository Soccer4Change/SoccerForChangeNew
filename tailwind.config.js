/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundPosition: {
        "top-50": "center -60px",
      },
      saturate: {
        25: ".25",
      },
      backgroundImage: {
        parallax: 'url("/soccerForChange.webp")',
        homeStock: 'url("/image2.png")',
        about: 'url("/happy.png")',
      },
      screens: {
        "min-text": { max: "50ch" },
      },
    },
  },
  plugins: [],
};
