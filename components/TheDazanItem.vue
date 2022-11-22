<template lang="">
  <div
    class="datsan mx-1 rounded-md shadow-md bg-neutral my-2 min-w-full relative"
  >
    <div class="flex justify-end absolute right-0 top-0">
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        class="shadow-xl inline-block ease-linear transition-all duration-150 text-gray-500 dark:text-gray-400 bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 w-9 h-9 items-center justify-center"
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
          v-if="!showMenu"
        >
          <path
            d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
          ></path>
        </svg>
        <font-awesome-icon icon="fa-solid fa-xmark" class="text-xl" v-else />
      </button>
      <!-- Dropdown menu -->
      <div
        id="dropdown"
        class="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 absolute right-0 top-11"
        v-if="showMenu"
      >
        <ul class="py-1" aria-labelledby="dropdownButton">
          <li>
            <label
              for="my-modal"
              class="block px-4 py-2 text-md text-red-600 hover:bg-gray-600 cursor-pointer"
              >Delete</label
            >
            <input type="checkbox" id="my-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
              <div class="modal-box">
                <label
                  for="my-modal"
                  class="btn btn-sm btn-circle absolute right-2 top-2"
                  >✕</label
                >
                <h3 class="font-bold text-lg">
                  Are you sure you want to delete this object?
                </h3>
                <div class="form-control min-w-full">
                  <label class="label">
                    <span class="label-text">Your email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    class="input input-bordered min-w-full"
                    v-model="store.email"
                  />
                </div>
                <p class="py-4">{{ store.removeMessage }}</p>
                <div class="modal-action">
                  <label
                    for="my-modal"
                    class="btn border-error text-error"
                    @click="store.removeDatzan(datzan.id)"
                    >Delete!</label
                  >
                </div>
              </div>
            </div>
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
        @click="$router.push(`/locations/${datzan.id}`)"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 ease-linear transition-all duration-150"
      >
        Read more
      </a>

      <a
        @click="$router.push({name: 'events', query: {location: datzan.id}})"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 ease-linear transition-all duration-150 mx-2"
      >
      Schedules
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
