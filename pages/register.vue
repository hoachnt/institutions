<template lang="">
  <div>
    <form @submit.prevent="submit">
      <h1>Sign up</h1>
      <UIInput type="text" placeholder="first name" v-model:value="data.firstName"/>
      <UIInput type="text" placeholder="last name" v-model:value="data.lastName"/>
      <UIInput type="email" placeholder="email" v-model:value="data.email"/>
      <UIInput type="password" placeholder="password" v-model:value="data.password"/>
      <UIButton>Sign up</UIButton>
    </form>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const { createUser } = useDirectusAuth();
const { login } = useDirectusAuth();

const store = usePiniaStore();
const url = "https://se6o31if.directus.app";

const router = useRouter();
const data = reactive({
  firstName: "",
  lastName: "",
  adminRole: "78a7b5a4-8ee0-4fc8-81c0-2f22a2301a0a",
  email: "",
  password: "",
});
const submit = async () => {
  try {
    let newUser = await createUser({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      role: data.adminRole,
    });

    let response = await login({
      email: data.email,
      password: data.password,
    });

    store.authenticated = true;
    store.userCreated = data.email;

    const token = useDirectusToken();

    await router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="">
</style>