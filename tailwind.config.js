/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backdropBlur: {
        '4xl': '80px',
      },
      fontFamily: {
        sans: ['TTNormsPro', 'sans-serif'],
      },
      screens: {
        xs: { max: '500px' },
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
        wave: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 0' },
        },
        'marquee-full': {
          '0%': { left: '-10%' },
          '100%': { left: '100%' },
        },
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
        'spin-reverse': 'spin-reverse 6s linear infinite',
        wave: 'wave 2s linear infinite',
        'marquee-full': 'marquee-full 1.5s linear infinite',
        'marquee-full-delay-1': 'marquee-full 1.5s linear infinite 0.3s',
        'marquee-full-delay-2': 'marquee-full 1.5s linear infinite 0.6s',
      },
    },
    fontSize: {
      base: '1rem',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
