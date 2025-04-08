/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-play': ['"Press Start 2P"', 'cursive'],
        'fredoka': ['Fredoka', 'sans-serif'],
      },
    },
  },
  plugins: [import("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
} 