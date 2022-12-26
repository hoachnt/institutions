/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          content: "#001F25",

          primary: "#FCDDBD",

          "button-text": "#ffffff",

          secondary: "#a68c6f",

          "secondary-btn": "#BD0046",

          accent: "#f3f4f6",

          neutral: "#F2F4F2",

          sidebar: "#F2F4F2",

          "base-100": "#F8FDFF",

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
