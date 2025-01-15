import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
    flowbite.content()
  ],
  theme: {
    fontFamily: {
      sans: ["Be Vietnam Pro", "Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
};
