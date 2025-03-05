/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'dark-grey': '#14121A',
      'medium-grey': '#1D1C24',
      'light-grey': '#2B2A31',
      'pink': '#F4DAE2',
      'pink-400': '#c3aeb5',
      'purple': '#9B7DDE',
      'purple-light': '#b9a4e8',
      'blue': '#4585DF',
      'blue-light': '#7daae9',
    },
    extend: {
      keyframes: {
        appear: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        appear: "appear 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
