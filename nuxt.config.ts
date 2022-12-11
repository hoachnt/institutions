// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: 'Institution'
    }
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
    '@vueuse/nuxt',
  ],
  i18n: {
    vueI18n: {
      legacy: false,
      locale: "en",
      messages: {
        en: {
          institutions: "Institutions",
          createANewInstitution: "Create a new institution",
          readMore: "Read more",
          schedules: "Schedule",
          login: "Login",
          register: "Register",
          firstName: "Firt name",
          lasttName: "Last name",
          password: "Password",
          add: "Add",
          logOut: "Logout",
          home: "Home",
          delete: "Delete",
          questionBeforeDeletion: "Are you sure you want to delete this object?",
          actionCannotBeUndone: "This action cannot be undone",
          yourEmail: "Your email",
          description: "Description",
          create: "Create",
          selectType: "Select type",
          church: "Church",
          temple: "Temple",
          mosque: "Mosque",
          dontHaveSchedules: "You don't have schedules",
          addSchedule: "Add schedule",
          emptySchedule: "Schedule is empty",
          createANewEvent: "Create a new event",
          createANewSchedule: "Create a new schedule",
          date: "Date",
          time: "Time",
          update: "Update",
          updateTitle: "Update title",
          downloadPdf: "Download PDF",
          name: "Name",
          maxLocations: "You can create only 10 institutions",
          editHeader: "Edit institution",
          edit: "Edit",
        },
        ru: {
          institutions: "Учреждения",
          createANewInstitution: "Создать новое учреждение",
          readMore: "Читать далее",
          schedules: "Расписание",
          login: "Войти",
          register: "Регистрация",
          firstName: "Имя",
          lasttName: "Фамилия",
          password: "Пароль",
          add: "Создать",
          logOut: "Выйти",
          home: "Главный",
          delete: "Удалить",
          questionBeforeDeletion: "Вы действительно хотите удалить объект?",
          actionCannotBeUndone: "Объект не может быть восстановлен",
          yourEmail: "Ваш email",
          description: "Описание",
          create: "Создать",
          selectType: "Выберите тип",
          church: "Церковь",
          temple: "Буддийский храм",
          mosque: "Мечеть",
          dontHaveSchedules: "У вас нет расписаний",
          addSchedule: "Создать расписание",
          emptySchedule: "Расписание пуст",
          createANewEvent: "Создать новый ивент",
          date: "Дата",
          time: "Время",
          update: "Обновить",
          updateTitle: "Обновить заголовок",
          downloadPdf: "Скачать PDF",
          name: "Название",
          createANewSchedule: "Создать новое расписание",
          maxLocations: "Вы можете создать только 10 учреждений",
          editHeader: "Редактировать учреждение",
          edit: "Редактировать",
        },
        vn: {
          institutions: "Tổ chức",
          createANewInstitution: "Tạo một tổ chức mới",
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
          delete: "Xóa",
          questionBeforeDeletion: "Bạn có chắc chắn muốn xóa không?",
          actionCannotBeUndone: "Hành động này không thể được hoàn tác",
          yourEmail: "Email của bạn",
          description: "Mô tả",
          create: "Tạo",
          selectType: "Lựa chọn",
          church: "Nhà thờ",
          temple: "Chùa",
          mosque: "Nhà thờ hồi giáo",
          dontHaveSchedules: "Bạn không có lịch trình",
          addSchedule: "Thêm lịch trình",
          emptySchedule: "Lịch trình trống",
          createANewEvent: "Tạo sự kiện mới",
          date: "Ngày",
          time: "Thời gian",
          update: "Cập nhật",
          updateTitle: "Cập nhật tiêu đề",
          downloadPdf: "Tải PDF",
          name: "Tiêu đề",
          createANewSchedule: "Tạo lịch trình mới",
          maxLocations: "Bạn chỉ có thể tạo 10 tổ chức",
          editHeader: "Chỉnh sửa Tổ chức",
          edit: "Chỉnh sửa",
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
    'vuetify/lib/styles/main.sass',
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
      "vuetify"
    ],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
});