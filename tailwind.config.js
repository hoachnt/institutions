/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6366f1",

          secondary: "#3b82f6",

          accent: "#1FB2A6",

          neutral: "#262626",

          "base-100": "#171717",

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
