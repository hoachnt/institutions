<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div
        class="
          w-full
          navbar
          bg-indigo-500
          mb-3
          flex
          justify-between
          sticky
          top-0
          z-10
        "
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
        <div
          v-if="token"
          @click="$router.push('/locations/new')"
          class="lg:hidden"
        >
          <a class="btn rounded-xl px-6">
            <div class="sm:mr-2">
              <font-awesome-icon icon="fa-solid fa-plus" v-if="store.loading" />
            </div>
            <p class="hidden sm:block">{{ $t("add") }}</p>
          </a>
        </div>
        <div class="hidden lg:flex">
          <ul class="menu menu-horizontal bg-base-100 rounded-xl mx-1">
            <!-- Navbar menu content here -->
            <li v-if="token" @click="$router.push('/locations/new')">
              <a class="btn">
                <div class="mr-1">
                  <font-awesome-icon
                    icon="fa-solid fa-plus"
                    v-if="store.loading"
                  />
                </div>
                <p>{{ $t("add") }}</p>
              </a>
            </li>
            <li class="nav-item" @click="$router.push('/')" v-if="token">
              <a class="btn rounded-none">
                <div class="mr-1">
                  <font-awesome-icon
                    icon="fa-solid fa-house"
                    v-if="store.loading"
                  />
                </div>
                <p>{{ $t("home") }}</p>
              </a>
            </li>
            <li
              class="nav-item"
              @click="$router.push('/register')"
              v-if="!token"
            >
              <a class="btn">
                <p>{{ $t("register") }}</p>
              </a>
            </li>
            <li class="nav-item" @click="$router.push('/login')" v-if="!token">
              <a class="btn">
                <div class="mr-1">
                  <font-awesome-icon
                    icon="fa-solid fa-right-to-bracket"
                    v-if="store.loading"
                  />
                </div>
                <p>{{ $t("login") }}</p>
              </a>
            </li>
            <li class="nav-item" @click="logOut" v-if="token">
              <a class="btn">
                <div class="mr-1">
                  <font-awesome-icon
                    icon="fa-solid fa-right-from-bracket"
                    v-if="store.loading"
                  />
                </div>
                <p>{{ $t("logOut") }}</p>
              </a>
            </li>
          </ul>
          <form class="ml-2">
            <select
              class="select select-bordered w-full max-w-xs"
              v-model="locale"
            >
              <option disabled selected>Choose language</option>
              <option value="en">English</option>
              <option value="ru">Рускиий</option>
              <option value="vn">Tiếng Việt</option>
            </select>
          </form>
        </div>
      </div>
      <!-- Page content here -->
      <NuxtLoadingIndicator />
      <ClientOnly>
        <template #default>
          <NuxtPage />
        </template>
        <template fallback-tag="button" #fallback>
          <div class="loader min-w-full flex items-center justify-center bg-black min-h-screen">
            <button class="btn btn-square loading btn-primary"></button>
          </div>
        </template>
      </ClientOnly>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>
      <ul class="sidebar menu w-80 bg-base-100">
        <!-- Sidebar content here -->
        <!-- <UIUserInfo /> -->
        <li v-if="token" @click="$router.push('/locations/new')">
          <a class="add-btn btn rounded-lg">
            <div class="mr-1">
              <font-awesome-icon icon="fa-solid fa-plus" v-if="store.loading" />
            </div>
            <p>{{ $t("add") }}</p>
          </a>
        </li>
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
          <a class="rounded-lg">
            <select
              class="select select-bordered w-full max-w-xs"
              v-model="locale"
            >
              <option disabled selected>Choose language</option>
              <option value="en">English</option>
              <option value="ru">Рускиий</option>
              <option value="vn">Tiếng Việt</option>
            </select>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";

const { locale } = useI18n();

const store = usePiniaStore();
const { logout } = useDirectusAuth();
const token = useDirectusToken();
const router = useRouter();

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
}
.add-btn {
  margin: 10px 0 !important;
}
select {
  background: #262626;
}
</style>