<template>
  <div class="drawer drawer-mobile">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div
        class="w-full navbar bg-base-100 flex justify-between sticky top-0 z-10"
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
          <a class="text-2xl uppercase select-none"> Indigo </a>
        </div>
        <div v-if="token" @click="$router.push('/locations/new')" class="block">
          <v-btn class="btn rounded-xl px-6 mx-2 bg-white">
            <div class="sm:mr-2">
              <font-awesome-icon icon="fa-solid fa-plus" v-if="store.loading" />
            </div>
            <p class="hidden sm:block">{{ $t("add") }}</p>
            <v-tooltip activator="parent" location="bottom"
              >Add Institution</v-tooltip
            >
          </v-btn>
        </div>
      </div>
      <!-- Page content here -->
      <main>
        <NuxtLoadingIndicator />
        <NuxtPage class="mt-3" />
      </main>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>
      <ul class="sidebar menu w-80">
        <!-- Sidebar content here -->
        <!-- <UIUserInfo /> -->
        <!-- <li v-if="token" @click="$router.push('/locations/new')">
          <a class="add-btn btn rounded-lg lg:hidden">
            <div class="mr-1">
              <font-awesome-icon icon="fa-solid fa-plus" v-if="store.loading" />
            </div>
            <p>{{ $t("add") }}</p>
          </a>
        </li> -->
        <li @click="$router.push('/')" v-if="token">
          <a class="rounded-lg">
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
          <a class="rounded-lg">
            <p>{{ $t("register") }}</p>
          </a>
        </li>
        <li @click="$router.push('/login')" v-if="!token">
          <a class="rounded-lg">
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
        <li>
          <TheFooter />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const user = useDirectusUser();

const { locale } = useI18n();

const store = usePiniaStore();
const { logout } = useDirectusAuth();
const token = useDirectusToken();
const router = useRouter();
const languages = [
  { language: "English", abbr: "en" },
  { language: "Рускиий", abbr: "ru" },
  { language: "Tiếng Việt", abbr: "vn" },
];

const logOut = async () => {
  await logout();

  await router.push("/login");
};
</script>
<style>
a {
  cursor: pointer;
}
.sidebar {
  padding: 65px 15px !important;
  background: rgb(13, 13, 13);
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
</style>