/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        500: '500px'
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
