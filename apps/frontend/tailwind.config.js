/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{
      "gris": "#CECECE",
      "negro-claro": "#212121",
      "blanco": "white",
    },
    extend: {
      fontFamily: {
        'parrafos': ['Roboto', 'sans-serif'],
        'titulos': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'h1': '2rem',  // 32px
        'h2': '1.5rem',    // 24px
        'h3': '1.125rem',   // 18px
        'p': '1rem',  // 16px
      },
    },
  },
  plugins: [],
};
