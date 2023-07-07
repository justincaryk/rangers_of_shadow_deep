/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './graphql/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  plugins: [ require('tailwindcss/nesting'), require('tw-elements/dist/plugin') ],
  theme: {
    fontFamily: {
      glue: 'GlueRave',
    },
    extend: {
      minHeight: {
        14: "3.5rem"
      },
      minWidth: {
        14: "3.5rem"
      },
      transitionTimingFunction: {
        "in-out": "cubic-bezier(0.2, 1, 0.25, 1)"
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        xxs: '3.5em',
      },
      borderWidth: {
        1: '1px',
      },
      backgroundColor: {
        stone: 'rgb(23,24,21)',
        cream: '#F1F0ED !important',
        'sky-blue': '#1C9AEF',
      },
      fontFamily: {
        roboto: 'Roboto Condensed,Roboto,Helvetica,sans-serif',
      },
      colors: {
        gray: {
          900: "#0f1011",
          dark: '#242527',
        },
        'off-white': 'rgb(240, 239, 239)',
        'dirty-orange': 'rgba(191, 88, 13, 0.82)',
        'hover-white': 'rgb(155, 152, 152)',
        'sky-blue': '#1C9AEF',
      },
      boxShadow: {
        'md-sky-blue': '0 4px 6px -1px rgba(28, 154, 239, 0.1), 0 2px 4px -1px rgba(28, 154, 239, 0.06)',
      },
      backgroundImage: {
        'hero-1': "url('/images/backgrounds/ranger-bg-1.png')",
        'hero-2': "url('/images/backgrounds/ranger-bg-2.png')",
        'hero-3': "url('/images/backgrounds/companions-bg-1.png')",
        'red-left': "url('/images/assets/red-border-left.png')",
        'red-right': "url('/images/assets/red-border-right.png')",
        'blue-1': "url('/images/backgrounds/x-blue-1.jpg')",
        'blue-2': "url('/images/backgrounds/x-blue-2.jpg')",
        'green-1': "url('/images/backgrounds/x-green-1.jpg')",
        'green-2': "url('/images/backgrounds/x-green-2.jpg')",
        'green-3': "url('/images/backgrounds/x-green-3.jpg')",
        'red-1': "url('/images/backgrounds/x-red-1.jpg')",
        'red-2': "url('/images/backgrounds/x-red-2.jpg')",
      },
    },
  },
}
