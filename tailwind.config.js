const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./*.html', './components/**/*.html', './admin/**/*.html'],
  safelist: ['bg-red-500', 'bg-red-200'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
