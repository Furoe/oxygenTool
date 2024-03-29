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
        'purple-100': 'rgba(230,171,255, 0.1)',
        'purple-300': 'rgba(230,171,255, 0.3)',
        'blue': '#1A6DFF',
        'blue-100': 'rgba(26,109,255,0.1)',
        'blue-300': 'rgba(26,109,255,0.3)',
        'vs-dark': '#1e1e1e'
      },
      margin: {
        '36px': '36px'
      },
      height: {
        '40px': '40px'
      },
      fontSize: {
        '24px': '24px'
      },
      boxShadow: {
        'bt-2px': 'inset 0 2px 0 0 #0ea5e9'
      }
    }
  },
  plugin: []
}