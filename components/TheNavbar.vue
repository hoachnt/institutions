<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-500 mb-3">
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto  px-3 lg:static lg:block lg:justify-start">
        <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" @click="$router.push('/')">
          indigo Color
        </a>
        <button @click="toggleNavbar" class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
          <span class="block relative w-6 h-px rounded-sm bg-white"></span>
          <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
        </button>
      </div>
      <div class="lg:flex items-center min-w-full lg:min-w-0" id="example-navbar-warning" v-if="!showMenu">
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
            <li class="nav-item" @click="$router.push('/')" v-if="token">
              <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                <div class="mr-1">
                  <font-awesome-icon icon="fa-solid fa-house" />
                </div>
                <p>Home</p>
              </a>
            </li>
            <li class="nav-item" @click="$router.push('/register')" v-if="!token">
              <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                Register
              </a>
            </li>
            <li class="nav-item" @click="$router.push('/login')" v-if="!token">
              <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                <div class="mr-1">
                  <font-awesome-icon icon="fa-solid fa-right-to-bracket" />                
                </div>
                <p>Login</p>
              </a>
            </li>
            <li class="nav-item" @click="logOut" v-if="token">
              <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
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