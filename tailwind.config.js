module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'custom-grey': '#647196',
      'custom-light-grey': '#969cb9',
      'custom-light-blue': '#f2f4ff',
      'custom-blue': '#62bcfb',
      'custom-violet': '#4661e6',
      'custom-navy': '#373e68',
      'custom-orange': '#f59f86',
      'custom-white': '#ffffff',
      'custom-purple': '#ae1feb',
      'custom-red': '#d73737 '
    },
    extend: {
      fontFamily: {
        Roboto: ['Jost'],
       },
    },
  },
  plugins: [],
}