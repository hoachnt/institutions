<template>
  <main>
    <div class="m-auto px-4 max-w-3xl">
      <h1 class="my-1 text-4xl">Locations</h1>
      <transition name="fade">
        <TheDatzanList :datzans="datzans" v-if="datzans != ''" />
        <div v-else>Location Empty</div>
      </transition>
    </div>
  </main>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const token = useDirectusToken();
const user = useDirectusUser();

const store = usePiniaStore();

const userCreated = ref(user.value.id);
const datzans = ref([]);
const config = useRuntimeConfig();
const url = config.public.url;

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Datzan",
});

const fetchDatzan = async () => {
  try {
    let response = await $fetch(
      `${url}/items/datzans?filter={"user_created":"${userCreated.value}"}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    datzans.value = response.data;
  } catch (error) {
    if (error.status == 401) {
      alert("You are not authorized or authorization timed out");
    }
    alert(error);
  }
};

onMounted(() => {
  fetchDatzan();
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