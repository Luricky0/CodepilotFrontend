/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-55': 'rgba(0, 0, 0, 0.55)',
        'black-08': 'rgba(0, 0, 0, 0.08)',
        'white-dark': ' rgb(247, 248, 250)'
      },
      fontFamily: {
        menlo: ['Menlo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
