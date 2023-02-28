/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color_teal: '#19ae88',
        color_green: '#178879',
        color_orange: '#fa8300',
        color_skin: '#f5c360',
        color_offWhite: '#eeeee1',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
