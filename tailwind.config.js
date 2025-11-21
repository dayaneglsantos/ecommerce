import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#ed8866',
        primaryDark: '#E75626',
        primaryLight: '#f5c3b3',
        secondary: '#268aa3',
        secondaryDark: '#004F63',
        secondaryLight: '#a1e0f0',
        neutral: '#fffbfa',
      },
    },
  },

  plugins: [forms],
};
