/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-std': '#1236e1',
        'blue-std-heavy': '#102385'
      },
    },
  },
  plugins: [],
}

