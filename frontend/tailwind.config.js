/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'purple' : "#8367D8",
        'grey_' : '#252525'
      }
    },
  },
  plugins: [],
}

