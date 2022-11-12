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

const store = usePiniaStore();
const router = useRouter();
const data = reactive({
  email: "",
  password: "",
});
const submit = async () => {
  try {
    const response = await $fetch(
      "https://b876ad7f-dd71-4ed3-829a-b2488d40b627.selcdn.net/auth/login",
      {
        method: "POST",
        body: {
          email: data.email,
          password: data.password,
        },
      }
    );
    // store.authenticated = true
    store.userCreated = response
    console.log(userCreated.value)

    await router.push("/");
  } catch (error) {}
};
</script>
<style lang="">
</style>