/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'landing-page': "linear-gradient(to right bottom, rgba(0, 0, 0, 0.8), rgba(117, 164, 214, 0.8)), url('../public/landing.jpg')",
      })
    },
  },
  plugins: [],
}