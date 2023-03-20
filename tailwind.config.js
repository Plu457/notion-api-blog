/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.postTotal::after': {
          content: 'attr(data-post-total)',
          position: 'absolute',
          fontSize: '1.5rem',
          top: '0px',
        },
      });
    },
  ],
};
