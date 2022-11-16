<template>
  <div class="container m-auto max-w-lg">
    <form @submit.prevent="submit" class="px-4">
      <h1 class="text-2xl mb-1">Sign up</h1>
      <UIInput type="text" placeholder="First name" v-model:value="data.firstName"/>
      <UIInput type="text" placeholder="Last name" v-model:value="data.lastName"/>
      <UIInput type="email" placeholder="Email" v-model:value="data.email"/>
      <UIInput type="password" placeholder="Password" v-model:value="data.password"/>
      <UIButton class="min-w-full">Sign up</UIButton>
    </form>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const { createUser } = useDirectusAuth();
const { login } = useDirectusAuth();

const store = usePiniaStore();

const router = useRouter();
const data = reactive({
  firstName: "",
  lastName: "",
  adminRole: "d9f8b306-3cfd-400b-926d-a8af29f45736",
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