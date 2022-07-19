const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cyber-yellow": "#FFD500",
        "light-blue": "#03a9f4"
      },
    },
    screens: {
      "2xs": "360px",
      'xs': '480px',
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}
