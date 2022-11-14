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
const user = useDirectusUser();
const token = useDirectusToken();

const email = user.value.email;
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
    `${url}/users?filter={"email":"${email}"}`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
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
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  dazans.value = response.data;
};

onMounted(() => {
  fetchUserData();
});

const createDazan = () => {
  try {
    return $fetch(`${url}/items/dazan`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
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