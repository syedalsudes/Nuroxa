import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-text': '#F3E9DC',
        'accent-text': '#D9A05B',
        'button-gold': '#B8860B',
        'button-hover': '#A4751D',
      },
      backgroundImage: {
        'brown-gradient': 'linear-gradient(135deg, #3E2C20, #5C4033, #A67856)',
      },
      fontFamily: {
        logo: ['"Brush Script MT"', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
