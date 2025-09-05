/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"]
      },
      colors: { link: '#0a5bd6' },
      maxWidth: { prose: '70ch' }
    }
  },
  plugins: []
};
