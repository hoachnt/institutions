<template lang="">
  <div class="block min-w-full p-6 pb-10 rounded-lg shadow-md bg-neutral-800 my-3">
    <div class="flex justify-end relative" v-if="token">
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
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
        class="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 absolute -right-10 top-12"
        v-if="showMenu"
      >
        <ul class="py-1" aria-labelledby="dropdownButton">
          <li>
            <a @click="toggleUpdate"
              class="block px-4 py-2 text-md hover:bg-gray-600"
              >Edit</a
            >
          </li>
          <li>
            <a
              @click="store.removeEvent(schedule.id)"
              class="block px-4 py-2 text-md text-red-600 hover:bg-gray-600"
              >Delete</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="mb-2 text-2xl font-bold tracking-tight text-white">
      {{ new Date(schedule.datetime).getDate() }}/{{
        new Date(schedule.datetime).getMonth()
      }}/{{ new Date(schedule.datetime).getFullYear() }}
    </div>
    <div class="mb-2 text-2xl font-bold tracking-tight text-white">
      {{ schedule.time }}
    </div>
    <div class="font-normal text-gray-400">{{ schedule.description }}</div>
    <div v-if="showUpdate" class="p-2 bg-neutral-900 rounded-md mt-10">
      <UIInput type="date" v-model:value="schedule.datetime"/>
      <UIInput type="time" v-model:value="schedule.time"/>
      <UIInput type="text" v-model:value="schedule.description"/>
      <UIButton @click="updateEvent">Update</UIButton>
    </div>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";

const store = usePiniaStore();
const token = useDirectusToken();

const props = defineProps({
  schedule: Object,
});
const showMenu = ref(false);

const showUpdate = ref(false);
const toggleNavbar = () => (showMenu.value = !showMenu.value);
const toggleUpdate = () => {
  showUpdate.value = !showUpdate.value
  showMenu.value = false
};
const updateEvent = async () => {
  let response = await $fetch(
    `${store.url}/items/events/${props.schedule.id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: props.schedule,
    }
  ).then(() => (showUpdate.value = false));
};
</script>
<style lang=""></style>
