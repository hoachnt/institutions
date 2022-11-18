<template>
  <nav
    class="
      relative
      flex flex-wrap
      items-center
      justify-between
      px-2
      py-3
      bg-indigo-500
      mb-3
    "
  >
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <div
        class="
          w-full
          relative
          flex
          justify-between
          lg:w-auto
          px-3
          lg:static lg:block lg:justify-start
        "
      >
        <a
          class="
            self-center
            text-xl
            font-semibold
            whitespace-nowrap
            dark:text-white
          "
          @click="$router.push('/')"
        >
          Indigo Color
        </a>
        <button
          @click="toggleNavbar"
          class="
            cursor-pointer
            text-xl
            leading-none
            px-3
            py-1
            border border-solid border-transparent
            rounded
            bg-transparent
            block
            lg:hidden
            outline-none
            focus:outline-none
          "
          type="button"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="lg:flex items-center min-w-full lg:min-w-0"
        id="example-navbar-warning"
        v-if="!showMenu"
      >
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item" @click="$router.push('/')" v-if="token">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
                leading-snug
                text-white
                hover:opacity-75
              "
            >
              <div class="mr-1">
                <font-awesome-icon icon="fa-solid fa-house" />
              </div>
              <p>Home</p>
            </a>
          </li>
          <li class="nav-item" @click="$router.push('/register')" v-if="!token">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
                leading-snug
                text-white
                hover:opacity-75
              "
            >
              Register
            </a>
          </li>
          <li class="nav-item" @click="$router.push('/login')" v-if="!token">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
                leading-snug
                text-white
                hover:opacity-75
              "
            >
              <div class="mr-1">
                <font-awesome-icon icon="fa-solid fa-right-to-bracket" />
              </div>
              <p>Login</p>
            </a>
          </li>
          <li class="nav-item" @click="logOut" v-if="token">
            <a
              class="
                px-3
                py-2
                flex
                items-center
                text-xs
                uppercase
                font-bold
                leading-snug
                text-white
                hover:opacity-75
              "
            >
              <div class="mr-1">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
              </div>
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
const { logout } = useDirectusAuth();

const token = useDirectusToken();
const router = useRouter();
const showMenu = ref(false);

const logOut = async () => {
  await logout();

  await router.push("/login");

  await document.location.reload(true);
};
const toggleNavbar = () => (showMenu.value = !showMenu.value);
</script>
<style>
a {
  cursor: pointer;
}
</style>