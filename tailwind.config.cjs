/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      padding: {
        '24px': '24px'
      },
      colors: {
        'primary': '#1677ff',
        'purple': '#E6ABFF',
        'blue': '#1A6DFF'
      },
      margin: {
        '36px': '36px'
      },
      height: {
        '40px': '40px'
      },
      fontSize: {
        '24px': '24px'
      }
    }
  },
  plugin: []
}