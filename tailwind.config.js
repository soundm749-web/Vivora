/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracota: {
          50: "#fbf3ef",
          100: "#f5e1d6",
          200: "#eac2ad",
          300: "#dd9d7e",
          400: "#cd7950",
          500: "#bd5f37",
          600: "#a14a2b",
          700: "#813a24",
          800: "#693022",
          900: "#572a1f",
        },
        crema: {
          50: "#fffdf9",
          100: "#fdf6ea",
          200: "#faedd2",
          300: "#f4dfae",
          400: "#ecca7d",
        },
        sage: {
          50: "#f3f6f1",
          100: "#e2eadc",
          200: "#c7d8ba",
          300: "#a7c094",
          400: "#88a873",
          500: "#6e8f5a",
          600: "#577147",
          700: "#46593a",
          800: "#3a4830",
          900: "#323e2a",
        },
        beige: {
          50: "#faf8f4",
          100: "#f2ede2",
          200: "#e4d8c2",
          300: "#d3bf9c",
          400: "#bfa278",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-serif", "Georgia"],
      },
    },
  },
  plugins: [],
};
