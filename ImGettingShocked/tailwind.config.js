/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        customRed: '#f54266',
        customGreen: '#5cbdb5',
        lightBlue: '#579cc7',
        darkBlue: '#5d77de'
      }
    },
  },
  plugins: [],
}

