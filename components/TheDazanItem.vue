<template lang="">
  <div class="datsan mx-1 rounded-md shadow-md bg-neutral-800 my-2 max-w-lg relative lg:w-auto">
    <div class="flex justify-end absolute right-0 top-0">
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 ease-linear transition-all duration-150"
        type="button"
        @click="toggleNavbar"
      >
        <span class="sr-only">Open dropdown</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
          ></path>
        </svg>
      </button>
      <!-- Dropdown menu -->
      <div
        id="dropdown"
        class="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 absolute right-0 top-11"
        v-if="showMenu"
      >
        <ul class="py-1" aria-labelledby="dropdownButton">
          <li>
            <a
              @click="store.removeDatzan(datzan.id)"
              class="block px-4 py-2 text-md text-red-600 hover:bg-gray-600"
              >Delete</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div>
      <img
        class="rounded-t-lg"
        :src="`https://directus.hoach.skryonline.com/assets/${datzan.img}`"
        alt=""
      />
    </div>
    <div class="p-5">
      <div>
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ datzan.name }}
        </h5>
      </div>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ datzan.description }}
      </p>
      <p class="mb-3 font-normal text-gray-400">
        {{ datzan.address }}
      </p>
      <a
        @click="$router.push(`/schedule/${datzan.id}`)"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 ease-linear transition-all duration-150"
        >
        Read more
        <svg
          aria-hidden="true"
          class="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const store = usePiniaStore();

const showMenu = ref(false);
const toggleNavbar = () => (showMenu.value = !showMenu.value);
const props = defineProps({
  datzan: Object,
});
</script>
<style>
.datsan {
  min-width: 310px;
}
</style>
