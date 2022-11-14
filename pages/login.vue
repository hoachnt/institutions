<template>
  <div>
    <form @submit.prevent="submit">
      <h1>Login</h1>
      <UIInput type="email" placeholder="email" v-model:value="data.email" />
      <UIInput
        type="password"
        placeholder="password"
        v-model:value="data.password"
      />
      <UIButton>Log in</UIButton>
    </form>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";

const url = "https://se6o31if.directus.app"
const store = usePiniaStore();
const router = useRouter();
const data = reactive({
  email: "",
  password: "",
});
const submit = async () => {
  try {
    const response = await $fetch(
      `${url}/auth/login`,
      {
        method: "POST",
        body: {
          email: data.email,
          password: data.password,
        },
      }
    );
    store.authenticated = true;
    store.userCreated = data.email;
    store.token = response.data.access_token;

    await router.push("/");
  } catch (error) {}
};
</script>
<style lang="">
</style>