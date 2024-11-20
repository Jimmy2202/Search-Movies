/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      screens: {
        "max-sm": { raw: "(max-width: 800px)" },
        "max-hm": { raw: "(max-height: 1400px)" },
      },
    },
  },
  plugins: [],
};
