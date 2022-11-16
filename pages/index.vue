<template>
  <div class="container m-auto px-4">
    <form @submit.prevent class="">
      <UIInput placeholder="Datzan name" v-model:value="datzan.name" />
      <UIInput placeholder="Datzan address" v-model:value="datzan.address" />
      <UIButton @click="createDatzan" class="min-w-full"
        >Create Datzan</UIButton
      >
    </form>
    <h1 class="mb-1 text-4xl mt-8">Datzans</h1>
    <TheDatzanList :datzans="datzans" v-if="datzan != ''" />
    <div v-else>datzan Empty</div>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const user = useDirectusUser();
const token = useDirectusToken();
const config = useRuntimeConfig();

const email = ref(user.value.email);
const store = usePiniaStore();

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Datzan",
});

const url = config.public.url;
const datzan = {
  name: "",
  address: "",
};
let datzans = ref();
const userCreated = ref("");

const fetchUserData = async () => {
  let response = await $fetch(
    `${url}/users?filter={"email":"${email.value}"}`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  userCreated.value = response.data[0].id;

  fetchDatzan();
};
const fetchDatzan = async () => {
  let response = await $fetch(
    `${url}/items/datzans?filter={"user_created":"${userCreated.value}"}`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );

  datzans.value = response.data;
};

onMounted(() => {
  fetchUserData();
});

const createDatzan = () => {
  try {
    return $fetch(`${url}/items/datzans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: datzan,
    })
      .then(() => datzans.value.push(datzan))
      .then(() => document.location.reload(true));
  } catch (error) {
    console.log(error);
  }
};
</script>