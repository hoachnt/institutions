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
const { login } = useDirectusAuth();

const url = "https://se6o31if.directus.app"
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
    console.log(e)
  }
};
</script>
<style lang="">
</style>