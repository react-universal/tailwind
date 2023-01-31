const defaultColors = require('tailwindcss/colors');
/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', '../../packages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...defaultColors,
      },
    },
  },
  plugins: [require('nativewind/tailwind/css')],
};
