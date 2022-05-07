const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./*.html', './components/**/*.html', './admin/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
