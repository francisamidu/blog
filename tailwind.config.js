/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['.src/components/**/*.tsx', '.src/pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        new: {
          100: "#5E6572",
          200: "#7D98A1",
          300: "#0c4767",
          400: "372772"
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
  purge: [],
}