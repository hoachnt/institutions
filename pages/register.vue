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

const store = usePiniaStore();

const router = useRouter();
const data = reactive({
  firstName: "",
  lastName: "",
  adminRole: "45facacc-afc6-4e96-9801-610a56153cde",
  email: "",
  password: "",
});
const submit = async () => {
  try {
    let response = await $fetch(
      "https://b876ad7f-dd71-4ed3-829a-b2488d40b627.selcdn.net/users",
      {
        method: "POST",
        body: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
          role: data.adminRole,
        },
      }
    );
    await $fetch(
      "https://b876ad7f-dd71-4ed3-829a-b2488d40b627.selcdn.net/auth/login",
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
    store.token = response.data.access_token

    await router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="">
</style>