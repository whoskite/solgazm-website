import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-play': ['"Press Start 2P"', 'cursive'],
        'fredoka': ['var(--font-fredoka)'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"],
  },
}

export default config 