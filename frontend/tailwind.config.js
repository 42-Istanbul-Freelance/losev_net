/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'losev-blue': '#0075af',
        'losev-yellow': '#FDC010',
      }
    },
  },
  plugins: [],
}
