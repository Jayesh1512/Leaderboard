/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'card': 'rgba(68, 149, 170, 1)',
        'primary' : 'rgba(68, 149, 170, 1)',
        'footer' : "#224B55"
      },
    },
  },
  plugins: [],
}

