<template>
  <div class="drawer drawer-mobile">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col px-4 py-2" id="scroll-target">
      <!-- Navbar -->
      <div
        class="
          min-w-full
          m-auto
          navbar
          mb-0
          bg-base-100/80
          border-2
          mt-0
          rounded-2xl
          flex
          justify-between
          sticky
          top-0
          z-20
          backdrop-blur-lg
        "
        :class="{ scroll: isActive }"
      >
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="px-2 mx-2 cursor-pointer" @click="$router.push('/')">
          <a class="text-2xl uppercase select-none"> Institutions </a>
        </div>
        <div v-if="token" @click="$router.push('/locations/new')" class="block">
          <UIButton>
            <div class="sm:mr-2">
              <font-awesome-icon icon="fa-solid fa-plus" v-if="store.loading" />
            </div>
            <p class="hidden sm:block">{{ $t("add") }}</p>
            <v-tooltip activator="parent" location="bottom"
              >Add Institution</v-tooltip
            >
          </UIButton>
        </div>
      </div>
      <!-- Page content here -->
      <main v-scroll:#scroll-target="onScroll">
        <NuxtLoadingIndicator />
        <NuxtPage class="mt-3" />
      </main>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>
      <ul
        class="
          sidebar
          menu
          w-80
          backdrop-blur-lg
          border-2
          rounded-2xl
          mt-2
          mb-2
          ml-2
        "
        id="sidebar"
      >
        <!-- Sidebar content here -->
        <!-- <li v-if="token">
          <a class="rounded-lg px-0">
            <UIUserInfo :user="user" />
          </a>
        </li> -->
        <li @click="$router.push('/')" v-if="token">
          <a class="sidebar-element rounded-lg" id="/">
            <div class="mr-1">
              <font-awesome-icon
                icon="fa-solid fa-house"
                v-if="store.loading"
              />
            </div>
            <p>{{ $t("home") }}</p>
          </a>
        </li>
        <li @click="$router.push('/register')" v-if="!token">
          <a class="sidebar-element rounded-lg" id="/register">
            <p>{{ $t("register") }}</p>
          </a>
        </li>
        <li @click="$router.push('/login')" v-if="!token">
          <a class="sidebar-element rounded-lg" id="/login">
            <div class="mr-1">
              <font-awesome-icon
                icon="fa-solid fa-right-to-bracket"
                v-if="store.loading"
              />
            </div>
            <p>{{ $t("login") }}</p>
          </a>
        </li>
        <li @click="logOut" v-if="token">
          <a class="rounded-lg">
            <div class="mr-1">
              <font-awesome-icon
                icon="fa-solid fa-right-from-bracket"
                v-if="store.loading"
              />
            </div>
            <p>{{ $t("logOut") }}</p>
          </a>
        </li>
        <li>
          <a>
            <v-select
              transition="slide-y-transition"
              v-model="locale"
              label="Language"
              :items="languages"
              item-title="language"
              item-value="abbr"
            ></v-select>
          </a>
        </li>
        <li class="absolute bottom-0 left-0">
          <TheFooter />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
import { useScroll } from "@vueuse/core";

const user = useDirectusUser();
const { locale } = useI18n();
const store = usePiniaStore();
const { logout } = useDirectusAuth();
const token = useDirectusToken();
const router = useRouter();
const isActive = ref(false);
const nowPostion = ref(0);
const languages = [
  { language: "English", abbr: "en" },
  { language: "Рускиий", abbr: "ru" },
  { language: "Tiếng Việt", abbr: "vn" },
];
const offsetTop = ref(0);
const localeStorageLang = localStorage.getItem("localeStorageLang");
const logOut = async () => {
  await logout();
  await router.push({ name: "login", query: { message: "logout" } });
};
function onScroll(e) {
  offsetTop.value = e.target.scrollTop;

  setTimeout(() => {
    nowPostion.value = offsetTop.value;
  }, 10);

  if (offsetTop.value >= nowPostion.value) {
    isActive.value = true;
  } else {
    isActive.value = false;
  }
}
function selectedSidebarElement() {
  const sidebarElements = document.querySelectorAll(".sidebar-element");

  sidebarElements.forEach((element) => {
    if (element.id === '/') {
      element.classList.add("active");
    }
  });
}

onUpdated(() => {
  localStorage.setItem("localeStorageLang", locale.value);
});
onMounted(() => {
  locale.value = localeStorageLang || "en";
  selectedSidebarElement()
});
</script>
<style>
a {
  cursor: pointer;
}
.sidebar {
  padding: 65px 15px !important;
  background: rgba(248, 253, 255, 0.8);
}
.add-btn {
  margin: 10px 0 !important;
}
select {
  background: #262626;
}
.content {
  min-height: calc(100vh - 80px);
}
.footer {
  flex: 0 0 auto;
}
.sidebar-element.active {
  background: #e3e8eb;
}
.navbar {
  transition: 0.2s cubic-bezier(0.71, 0.29, 0.4, 0.8);
}
.navbar.scroll {
  transform: translateY(-100%);
}
</style>