/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens:{
      'sm': {'max': '768px'},

      'ss' : {'max': '370px'},
      'sd' : {'max': '540px'},
      'sg' : {'min': '540px', 'max': '768px'},

      'md': {'min': '768px', 'max': '1024px'},


      'lg': {'min': '1024px'},
    },
    extend: {},
  },
  plugins: [],
}
