// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  publicRuntimeConfig: {
    url: process.env.VITE_ENDPOINT,
    my_domain: process.env.MY_DOMAIN,
  },
  imports: {
    dirs: ["stores"],
  },
  modules: [
    "nuxt-directus",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
  ],
  i18n: {
    vueI18n: {
      legacy: false,
      locale: "en",
      messages: {
        en: {
          locations: "Locations",
          readMore: "Read more",
          schedules: "Schedules",
          login: "Login",
          register: "Register",
          firstName: "Firt name",
          lasttName: "Last name",
          password: "Password",
          add: "Add",
          logOut: "Logout",
          home: "Home",
        },
        ru: {
          locations: "Расположения",
          readMore: "Читать далее",
          schedules: "Расписания",
          login: "Войти",
          register: "Регистрация",
          firstName: "Имя",
          lasttName: "Фамилия",
          password: "Пароль",
          add: "Создать",
          logOut: "Выйти",
          home: "Главный",
        },
        vn: {
          locations: "Địa điểm",
          readMore: "Đọc thêm",
          schedules: "lịch trình",
          login: "Đăng nhập",
          register: "Đăng ký",
          firstName: "Tên",
          lasttName: "Họ",
          password: "Mật khẩu",
          add: "Add",
          logOut: "Đăng xuất",
          home: "Home",
        },
      },
    },
  },
  directus: {
    url: "https://directus.hoach.skryonline.com",
    token: "",
  },
  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-brands-svg-icons",
    ],
  },
});
