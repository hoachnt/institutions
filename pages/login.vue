<template>
  <div class="container m-auto max-w-lg">
    <form @submit.prevent="submit" class="px-4">
      <h1 class="text-2xl mb-1">Login</h1>
      <UIInput type="email" placeholder="Email" v-model:value="data.email" />
      <UIInput
        type="password"
        placeholder="Password"
        v-model:value="data.password"
      />
      <UIButton class="min-w-full">Log in</UIButton>
    </form>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const { login } = useDirectusAuth();

const store = usePiniaStore();
const router = useRouter();
const data = reactive({
  email: "",
  password: "",
});
const submit = async () => {
  try {
    let response = await login({
      email: data.email,
      password: data.password,
    });

    store.authenticated = true;
    store.userCreated = data.email;

    const token = useDirectusToken();

    await router.push("/");
  } catch (e) {
    console.log(e);
  }
};
</script>
<style lang="">
</style>