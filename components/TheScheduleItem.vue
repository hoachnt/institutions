<template lang="">
  <div class="block min-w-full p-6 pb-10 rounded-xl shadow-md bg-neutral my-3">
    <div class="flex justify-end relative" v-if="token">
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        class="ease-linear transition-all duration-150 text-base-100 bg-base-100 dark:text-gray-400 hover:bg-neutral focus:ring-4 focus:outline-none focus:ring-base-100 rounded-xl text-sm p-1.5 w-10 h-10 flex items-center justify-center"
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
        class="text-base list-non divide-y divide-gray-100 rounded-lg shadow w-44 bg-base-100 absolute -right-5 top-11"
        v-if="showMenu"
      >
        <ul class="py-1" aria-labelledby="dropdownButton">
          <li>
            <a
              @click="toggleUpdate"
              class="block px-4 py-2 text-md hover:bg-neutral cursor-pointer ease-linear transition-all duration-150 select-none"
              >{{ $t("edit") }}</a
            >
          </li>
          <li>
            <label
              for="my-modal"
              class="block px-4 py-2 text-md text-red-600 hover:bg-neutral cursor-pointer ease-linear transition-all duration-150 select-none"
              >{{ $t("delete") }}</label
            >
            <teleport to="body">
              <input type="checkbox" id="my-modal" class="modal-toggle" />
              <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box relative">
                  <label
                    for="my-modal"
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                    >✕</label
                  >
                  <h3 class="font-bold text-lg">
                    {{ $t("questionBeforeDeletion") }}
                  </h3>
                  <p class="py-4">{{ $t("actionCannotBeUndone") }}</p>
                  <div
                    class="modal-action"
                    @click="$emit('removeEvent', schedule.id)"
                  >
                    <label for="my-modal" class="btn border-error text-red-600"
                      >{{ $t("delete") }}!</label
                    >
                  </div>
                </div>
              </div>
            </teleport>
          </li>
        </ul>
      </div>
    </div>
    <div class="mb-2 text-2xl font-bold tracking-tight text-white">
      {{ schedule.name }}
    </div>
    <div class="mb-2 text-2xl font-bold tracking-tight text-white">
      {{ new Date(schedule.datetime).getDate() }}/{{
        new Date(schedule.datetime).getMonth() + 1
      }}/{{ new Date(schedule.datetime).getFullYear() }}
    </div>
    <div class="mb-2 text-2xl font-bold tracking-tight text-white">
      {{ schedule.time }}
    </div>
    <div class="font-normal text-gray-400">{{ schedule.description }}</div>
    <form
      @submit.prevent
      v-if="showUpdate"
      class="p-2 bg-base-100 rounded-md mt-10"
    >
      <UIInput type="text" v-model:value="schedule.name" />
      <UIInput type="date" v-model:value="schedule.datetime" />
      <UIInput type="time" v-model:value="schedule.time" />
      <UIInput type="text" v-model:value="schedule.description" />
      <UIButton @click="updateEvent">
        {{ $t("edit") }}
      </UIButton>
    </form>
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
  showUpdate.value = !showUpdate.value;
  showMenu.value = false;
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
