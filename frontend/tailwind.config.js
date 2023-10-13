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
        'grey_' : '#252525',
        'lightgrey-200' : '#9B9B9B',
        'lightgrey-100' : '#FAFAFA'
      }
    },
  },
  plugins: [],
}

