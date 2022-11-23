<template>
  <main>
    <div class="m-auto px-4 max-w-3xl">
      <h1 class="my-1 text-4xl">Datzans</h1>
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