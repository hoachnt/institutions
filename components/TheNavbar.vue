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
        <label class="btn swap swap-rotate lg:hidden">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" @click="toggleNavbar" />

          <!-- hamburger icon -->
          <svg
            class="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path
              d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
            />
          </svg>
          <!-- close icon -->
          <svg
            class="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon
              points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
            />
          </svg>
        </label>
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