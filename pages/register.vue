<template>
  <main>
    <div class="container m-auto max-w-lg">
      <form @submit.prevent="submit" class="px-4">
        <h1 class="text-2xl mb-1">{{ $t("register") }}</h1>
        <UIInput
          type="text"
          placeholder="First name"
          v-model:value="data.firstName"
          required
        />
        <UIInput
          type="text"
          placeholder="Last name"
          v-model:value="data.lastName"
        />
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
        <UIButton class="min-w-full">{{ $t("register") }}</UIButton>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Have account?
          <a
            @click="$router.push('/login')"
            class="text-content underline"
            >{{ $t("login") }}</a
          >
        </div>
      </form>
    </div>
  </main>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});

type UserRegister = {
  firstName: string;
  lastName: string;
  adminRole: string;
  email: string;
  password: string;
};

const { createUser } = useDirectusAuth();
const { login } = useDirectusAuth();

const router = useRouter();
const data: UserRegister = reactive({
  firstName: "",
  lastName: "",
  adminRole: "d9f8b306-3cfd-400b-926d-a8af29f45736",
  email: "",
  password: "",
});
const submit = async (): Promise<void> => {
  try {
    if (data.firstName.length >= 1) {
      await createUser({
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

      await router.push("/locations/new");

      await document.location.reload(true);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="">
</style>