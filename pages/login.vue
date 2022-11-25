<template>
  <main>
    <div class="container m-auto max-w-lg">
      <form @submit.prevent="submit" class="px-4">
        <h1 class="text-2xl mb-1">{{ $t("login") }}</h1>
        <UIInput
          type="email"
          placeholder="Email"
          v-model:value="data.email"
          required
        />
        <UIInput
          type="password"
          placeholder="Password"
          v-model:value="data.password"
          required
        />
        <UIButton class="min-w-full">{{ $t("login") }}</UIButton>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered?
          <a
            @click="$router.push('/register')"
            class="text-indigo-700 hover:underline dark:indigo-500"
            >{{ $t("register") }}</a
          >
        </div>
      </form>
    </div>
  </main>
</template>
<script setup>
const { login } = useDirectusAuth();

definePageMeta({
  middleware: ["authenticated"],
});

const router = useRouter();
const data = reactive({
  email: "",
  password: "",
});
const submit = async () => {
  try {
    if (data.email.length >= 1 && data.password.length >= 1) {
      let response = await login({
        email: data.email,
        password: data.password,
      });
    }

    await router.push("/");
    await document.location.reload(true);
  } catch (e) {
    if (e.status == 401) {
      alert("Wrong email or password");
    }
    console.log(e);
  }
};
</script>
<style lang="">
</style>