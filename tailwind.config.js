const plugin = require('tailwindcss/plugin');

const myUtilities = plugin(function ({ addUtilities }) {
  addUtilities({
    '.scrollbar-hide': {
      /* IE and Edge */
      '-ms-overflow-style': 'none',

      /* Firefox */
      'scrollbar-width': 'none',

      /* Safari and Chrome */
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgba(29, 155, 240, 1)',
        borderLight: 'rgba(239, 243, 244, 1)',
        borderDark: 'rgba(47, 51, 54, 1)',
        itemHoverLight: 'rgba(47, 51, 54, 0.1)',
        itemHoverDark: 'rgba(239, 243, 244, 0.1)',
      },
    },
  },
  plugins: [myUtilities],
};
