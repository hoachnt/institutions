<template>
  <main>
    <div class="container m-auto px-4">
      <form @submit.prevent class="">
        <UIInput placeholder="Datzan name" v-model:value="datzan.name" />
        <UIInput placeholder="Datzan address" v-model:value="datzan.address" />
        <UIButton @click="createDatzan" class="min-w-full"
          >Create Datzan</UIButton
        >
      </form>
      <h1 class="mb-1 text-4xl mt-8">Datzans</h1>
      <TheDatzanList :datzans="store.datzans" v-if="datzan != ''" />
      <div v-else>datzan Empty</div>
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

const datzan = {
  name: "",
  address: "",
};

onMounted(() => {});

const createDatzan = () => {
  try {
    return $fetch(`${store.url}/items/datzans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: datzan,
    }).then(() => store.fetchDatzan());
  } catch (error) {
    console.log(error);
  }
};
</script>