/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "rgba(191, 219, 254, 0.12) 0px 2px 4px 0px, rgba(191, 219, 254, 0.32) 0px 2px 16px 0px;",
      },
    },
  },
  plugins: [],
};
