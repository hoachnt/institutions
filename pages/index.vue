<template>
  <div>
    <form @submit.prevent>
      <UIInput placeholder="Dazan name" v-model:value="dazan.title" />
      <UIInput placeholder="Dazan address" v-model:value="dazan.address" />
      <UIButton @click="createDazan">Create Dazan</UIButton>
    </form>
    <TheDazanList :dazans="dazans" v-if="dazans != ''" />
    <div v-else>Dazans Empty</div>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Dazan",
});

const url = `https://b876ad7f-dd71-4ed3-829a-b2488d40b627.selcdn.net/items`;
const dazan = {
  title: "",
  address: "",
};
let dazans = ref();

const fetchDazan = async () => {
  let response = await $fetch(`${url}/dazan`);

  dazans.value = response.data;
};

onMounted(fetchDazan);

const createDazan = () => {
  try {
    return $fetch(`${url}/dazan`, {
      method: "POST",
      body: dazan,
    })
      .then(() => dazans.value.push(dazan))
      .then(() => document.location.reload(true));
  } catch (error) {
    console.log(error);
  }
};
</script>