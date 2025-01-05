import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    extract
  },
  theme: {
    screens, // Tailwind's default screens, in `rem`
    fontSize, // Tailwind's default font sizes, in `rem` (including line heights)
    extend: {
      screens: {
        xs: '20rem'
      }
    },
  },
  plugins: [fluid],
}

