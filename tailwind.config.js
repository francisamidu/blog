/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        new: {
          100: "#040e25",
          200: "#7D98A1",
          300: "#0c4767",
          400: "#e92164"
        }
      }
    },
  },
  plugins: [],
}