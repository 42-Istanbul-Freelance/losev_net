/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'losev-red': '#E30613',
        'losev-yellow': '#FDC010',
      }
    },
  },
  plugins: [],
}
