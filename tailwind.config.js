/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        goldLight: '#F5D67B',
        cream: '#F9F9F7',
        blackText: '#0A0A0A',
        greyText: '#4A4A4A',
      },
      fontFamily: {
        logo: ['"Brush Script MT"', 'cursive'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #F5D67B 0%, #D4AF37 50%, #B89028 100%)',
      },
    },
  },
  plugins: [],
}

