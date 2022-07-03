/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      borderColor: ["autofill", "dark"],
      textColor: ["autofill", "dark"],
      backgroundColor: ["autofill", "dark"],
      screens: {
        maxLg: { max: "767px" },
        maxLg: { max: "1024px" },
        max2Xl: { max: "1536px" },
        bwMd: { min: "768px", max: "1023px" },
      },
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
      },
      colors: {
        darkGrey: "#222831",
        darkBody: "rgb(48, 48, 48)",
        darkCard: "#424242",
        darkHover: "#808080",
        selectBlue: "rgba(33, 150, 243, 0.16)",
        popup: "rgba(0,0,0,0.5)",
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        indigo9: "#0000d9",
        violet9: "#581f8e",
      },
      boxShadow: {
        "3xl": "0 20px 25px -5px rgba(230, 180, 15, 0.9), 0 10px 10px 5px rgba(8, 131, 161, 0.9)",
        bottom: "0px 10px 10px -5px rgba(0,0,0,0.1)",
      },
      fontFamily: {
        hiragino: "Hiragino Sans W3",
        helvetica: "Roboto, Helvetica, Arial, sans-serif",
        sans: ["'Josefin Sans'"],
        mono: ["'Space Mono'"],
      },
      outline: {
        red: "2px solid #f87171",
      },
    },
  },
  variants: {},
  important: true,
  plugins: [
    require("tailwindcss-autofill"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "#FC0 1px 0 2px",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
