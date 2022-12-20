/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          content: "#000000",

          primary: "#2A2828",

          secondary: "#1c1917",

          accent: "#f3f4f6",

          neutral: "#E4D8B4",

          "sidebar": "#E4D8B4",

          "base-100": "#D2C59D",

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
