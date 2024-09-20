/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
          
        },
        animation: {
          'spin-slow': 'spin 3s linear infinite',
      }
      }
    },
  },
  plugins: [],
}