<template lang="">
  <div
    class="datsan mx-1 rounded-xl shadow-md bg-neutral my-2 min-w-full relative"
  >
    <div class="flex justify-end absolute right-0 top-0">
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        class="shadow-xl p-2 m-1 ease-linear transition-all duration-150 text-gray-500 dark:text-gray-400 bg-neutral focus:ring-4 focus:outline-none dark:focus:ring-neutral rounded-xl text-sm w-10 h-10 flex items-center justify-center"
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
        class="z-0 text-base list-non divide-y divide-gray-100 rounded-lg shadow w-44 bg-neutral absolute -right-5 top-12 bg-base-100/80 backdrop-blur-lg"
        v-if="showMenu"
      >
        <ul class="py-1" aria-labelledby="dropdownButton">
          <li
            @click="
              $router.push({
                name: 'locations-edit',
                query: { location: location.id },
              })
            "
            class="block px-4 py-2 text-md hover:bg-base-100 cursor-pointer ease-linear transition-all duration-150 select-none"
          >
            <a>
              {{ $t("edit") }}
            </a>
          </li>
          <li>
            <label
              for="my-modal"
              class="block px-4 py-2 text-md text-red-600 hover:bg-base-100 cursor-pointer ease-linear transition-all duration-150 select-none"
              >{{ $t("delete") }}</label
            >
            <teleport to="body">
              <input type="checkbox" id="my-modal" class="modal-toggle" />
              <div class="modal modal-bottom sm:modal-middle bg-base-100/80 backdrop-blur-lg">
                <div class="modal-box">
                  <label
                    for="my-modal"
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                    >✕</label
                  >
                  <h3 class="font-bold text-lg text-white mb-2">
                    {{ $t("questionBeforeDeletion") }}
                  </h3>
                  <div class="form-control min-w-full">
                    <label class="label">
                      <span class="label-text">{{ $t("yourEmail") }}</span>
                    </label>
                    <UIInput
                      type="email"
                      placeholder="example@gmail.com"
                      class="input input-bordered min-w-full text-white"
                      v-model:value="store.email"
                    />
                  </div>
                  <p class="py-4 text-white">
                    {{ $t("actionCannotBeUndone") }}
                  </p>
                  <div class="modal-action">
                    <label
                      for="my-modal"
                      class="btn btn-outline btn-error"
                      @click="store.removeDatzan(location.id)"
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

    <ClientOnly>
      <template #default>
        <transition name="blur">
          <div>
            <img
              class="rounded-xl min-w-full"
              :src="`https://directus.hoach.skryonline.com/assets/${location.img}`"
              alt=""
            />
          </div>
        </transition>
      </template>
      <template #fallback>
        <transition name="blur">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </transition>
      </template>
    </ClientOnly>
    <div class="p-5">
      <div>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">
          {{ location.name }}
        </h5>
      </div>
      <p class="mb-3 font-normal text-gray-400">
        {{ location.description }}
      </p>
      <p class="mb-3 font-normal text-gray-400">
        {{ location.address }}
      </p>
      <v-btn
        @click="$router.push(`/locations/${location.id}`)"
        color="white"
        class="inline-flex items-center px-4 w-auto h-auto py-3 text-sm font-medium text-center text-black bg-white rounded-xl hover:bg-secondary ease-linear transition-all duration-150 select-none"
      >
        {{ $t("readMore") }}
      </v-btn>

      <v-btn
        variant="outlined"
        color="white"
        @click="
          $router.push({ name: `events`, query: { location: location.id } })
        "
        class="inline-flex items-center px-4 w-auto h-auto py-3 bg-none text-sm font-medium text-center text-white rounded-xl hover:bg-primary ease-linear transition-all duration-150 mx-2 select-none"
      >
        {{ $t("schedules") }}
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
      </v-btn>
      <div class="card-actions justify-end mt-4">
        <div class="badge badge-outline select-none">{{ location.type }}</div>
      </div>
    </div>
    <div class="toast">
      <div class="alert alert-error" v-if="store.removeDatzanError">
        <div>
          <span>Success. {{ store.removeMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const store = usePiniaStore();

const showMenu = ref(false);
const toggleNavbar = () => (showMenu.value = !showMenu.value);
const props = defineProps({
  location: Object,
});
</script>
<style>
.datsan {
  min-width: 310px;
}
.blur-enter-active,
.blur-leave-active {
  transition: all 0.4s;
}
.blur-enter-from,
.blur-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
