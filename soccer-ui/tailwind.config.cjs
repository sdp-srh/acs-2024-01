module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui')
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "aqua", "business", "retro", "luxury", "lemonade"],
  },
  purge: [
    './node_modules/ui-reuse/**/*.svelte', // Add this line
    './src/**/*.{svelte,js,ts}'
  ],
};


