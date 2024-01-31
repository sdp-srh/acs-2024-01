# Installation (SRH)
Create the project: ```npm create vite@latest```  
  - choose name  
  - choose svelte  
  - choose js  

Navigate in the new folder  

Run ```npm install```

Run ```npm run dev``` for testing

Install router for navigation:  
```npm i - D svelte-spa-router```


# install css frameworks and configure
here we install daisy ui, tailwind and iconify  
```npm install -D tailwindcss postcss autoprefixer daisyui @tailwindcss/typography @iconify/svelte```  

## configure tailwind
initialize tailwind:  
```npx tailwindcss init```  
rename a file:  
```mv tailwind.config.js tailwind.config.cjs```

create the postcss config file:  
```echo ' ' >>postcss.config.cjs```

## change tailwind.config.cjs:  
```javascript
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui')
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "aqua", "business", "retro", "luxury", "lemonade"],
  },
};
```

## change postcss.config.cjs:  
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## change the vite-config.js
```javascript
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    outDir: './dist'
  }
})
```


## change the index.html
```html
<html lang="en" data-theme="dark">
```

## change the src/app.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# now we can develop in the src folder
Main files:
- App.svelte
- components folder

# run locally
```npm run dev```

# run build
```npm run build```  
here we should change to the html folder on server





