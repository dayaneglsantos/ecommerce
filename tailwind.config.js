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
        'primary-dark': '#E75626',
        'primary-light': '#f5c3b3',
        secondary: '#268aa3',
        'secondary-dark': '#004F63',
        'secondary-light': '#a1e0f0',
        neutral: '#fffbfa',
      },
      boxShadow: {
        full: '0 0 20px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: { progress: 'progress 1.5s ease-in-out infinite' },
    },
  },

  plugins: [forms],
};
