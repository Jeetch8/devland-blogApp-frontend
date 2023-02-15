/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      libre: ["Libre Baskerville", "cursive"],
    },
    extend: {
      keyframes: {
        slideIn: {
          "0%, 100%": { left: "100vw" },
          "100%": { left: "0" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s",
      },
    },
  },
  plugins: [],
};
