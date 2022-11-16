<template>
  <nav
    class="
      relative
      flex flex-wrap
      items-center
      justify-between
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
          px-4
          lg:static lg:block lg:justify-start
        "
      >
        <a
          class="
            text-sm
            font-bold
            leading-relaxed
            inline-block
            mr-4
            py-2
            whitespace-nowrap
            uppercase
            text-white
          "
          href=""
        >
          indigo Color
        </a>
        <button
          class="
            text-white
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
          v-on:click="toggleNavbar()"
        >
          <p class="fas fa-bars">Menu</p>
        </button>
      </div>
      <div
        v-bind:class="{ hidden: !showMenu, flex: showMenu }"
        class="
          lg:flex lg:flex-grow-0
          items-center
          ease-linear
          transition-all
          duration-150
        "
      >
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item" @click="$router.push('/')">
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
              <i
                class="
                  fab
                  fa-facebook-square
                  text-lg
                  leading-lg
                  text-white
                  opacity-75
                "
              /><span class="ml-2">Home</span>
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
              <i
                class="fab fa-twitter text-lg leading-lg text-white opacity-75"
              /><span class="ml-2">Register</span>
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
              <i
                class="fab fa-twitter text-lg leading-lg text-white opacity-75"
              /><span class="ml-2">Login</span>
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
              <i
                class="
                  fab
                  fa-pinterest
                  text-lg
                  leading-lg
                  text-white
                  opacity-75
                "
              /><span class="ml-2">Logout</span>
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
  logout();

  router.push("/login");
};
const toggleNavbar = () => (showMenu.value = !showMenu.value);
</script>
<style>
a {
  cursor: pointer;
}
</style>