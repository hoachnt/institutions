<template>
  <main>
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
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?
          <a
            @click="$router.push('/register')"
            class="text-indigo-700 hover:underline dark:indigo-500"
            >Create account</a
          >
        </div>
      </form>
    </div>
  </main>
</template>
<script setup>
const { login } = useDirectusAuth();

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

    const token = useDirectusToken();

    await router.push("/");
  } catch (e) {
    console.log(e);
  }
};
</script>
<style lang="">
</style>