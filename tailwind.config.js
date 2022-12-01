/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          content: "#ffffff",

          primary: "#2A2828",

          secondary: "#1c1917",

          accent: "#f3f4f6",

          neutral: "#171717",

          "sidebar": "#0D0D0D",

          "base-100": "#000000",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#e11d48",
        },
      },
    ],
  },
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
