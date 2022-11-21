<template>
  <main>
    <div class="m-auto px-4 max-w-3xl">
      <button
        @click="$router.push('/locations/new')"
        class="
          min-w-full
          bg-indigo-500
          text-white
          border border-indigo-500
          hover:bg-indigo-500 hover:text-white
          active:bg-indigo-600
          font-bold
          uppercase
          text-sm
          px-6
          py-3
          rounded
          outline-none
          focus:outline-none
          mt-1
          mb-1
          ease-linear
          transition-all
          duration-150
        "
      >
        Create Datzan
      </button>
      <h1 class="mb-1 text-4xl mt-8">Datzans</h1>
      <transition name="fade">
        <TheDatzanList :datzans="store.datzans" v-if="store.datzans != ''" />
        <div v-else>datzan Empty</div>
      </transition>
    </div>
  </main>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const token = useDirectusToken();

const store = usePiniaStore();

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Datzan",
});

onMounted(() => {
  store.fetchDatzan();
});
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>