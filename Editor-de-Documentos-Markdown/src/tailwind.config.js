// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    // Garante que o Tailwind analise todos os seus arquivos dentro de src/
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Necessário para o estilo 'prose' no seu Preview Markdown
    require('@tailwindcss/typography'), 
  ],
};