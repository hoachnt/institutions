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
import { usePiniaStore } from "@/stores/PiniaStore";
const { getItems } = useDirectusItems();

const store = usePiniaStore();

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Dazan",
});

const url = "https://se6o31if.directus.app";
const dazan = {
  title: "",
  address: "",
};
let dazans = ref();
const userCreated = ref("");

const fetchUserData = async () => {
  let response = await $fetch(
    `${url}/users?filter={"email":"${store.userCreated}"}`,
    {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    }
  );
  userCreated.value = response.data[0].id;

  fetchDazan();
};
const fetchDazan = async () => {
  let response = await $fetch(
    `${url}/items/dazan?filter={"user_created":"${userCreated.value}"}`,
    {
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
    }
  );

  dazans.value = response.data;
};

onMounted(() => {
  fetchUserData();
  testFetch();
});

const testCollection = ref([]);
const testFetch = async () => {
  try {
    const items = await getItems({
      collection: "dazan",
      Authorization: `Bearer ${store.token}`,
    });
    testCollection.value = items;
    console.log(testCollection.value);
  } catch (error) {}
};

const createDazan = () => {
  try {
    return $fetch(`${url}/items/dazan`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${store.token}`,
      },
      body: dazan,
    })
      .then(() => dazans.value.push(dazan))
      .then(() => document.location.reload(true));
  } catch (error) {
    console.log(error);
  }
};
</script>