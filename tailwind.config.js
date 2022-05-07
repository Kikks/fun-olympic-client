const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './*.html',
    './register/**/*.html',
    './login/**/*.html',
    './admin/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
