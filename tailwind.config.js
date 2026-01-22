/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        'accent-magenta': '#AB0782',
        'accent-blue': '#0034AD',
        'accent-yellow': '#6E660A',
        'accent-purple': '#5F00AD',
        'divider-grey': '#4F4F4F',
      },
      fontFamily: {
        'serif': ['Montserrat', 'sans-serif'],
        'mono': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'h1': ['50px', { lineHeight: '1.2', letterSpacing: '-2.25px', fontWeight: '300' }],
        'body': ['24px', { lineHeight: '1.52', letterSpacing: '-1.08px', fontWeight: '400' }],
        'caption': ['16px', { lineHeight: '1.03', letterSpacing: '-0.72px', fontWeight: '500' }],
      },
      spacing: {
        '19': '19px',
        '30': '30px',
        '50': '50px',
        '80': '80px',
        '100': '100px',
        '120': '120px',
        '150': '150px',
        '200': '200px',
      },
      maxWidth: {
        'content': '1500px',
        'main-content': '1000px',
      },
    },
  },
  plugins: [],
}
