<template>
  <main>
    <div class="container m-auto max-w-lg">
      <Suspense>
        <template #default>
          <form @submit.prevent="submit" class="px-4">
            <h1 class="text-2xl mb-1">{{ $t("login") }}</h1>
            <UIInput
              type="email"
              :placeholder="$t('email')"
              v-model:value="data.email"
              required
            />
            <UIInput
              type="password"
              :placeholder="$t('password')"
              v-model:value="data.password"
              required
            />
            <UIButton class="min-w-full">{{ $t("login") }}</UIButton>
            <div class="text-sm font-medium text-gray-500">
              Not registered?
              <a
                @click="$router.push('/register')"
                class="text-content underline"
                >{{ $t("register") }}</a
              >
            </div>
          </form>
        </template>
        <template #fallback>
          <button class="btn btn-square loading btn-primary"></button>
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup lang="ts">
const { login } = useDirectusAuth();

definePageMeta({
  middleware: ["authenticated"],
});

interface IUser {
  email: string;
  password: string;
}
const { messageFunction } = messageLogin();
const router = useRouter();
const booleanTrue: boolean = true;
const data: IUser = reactive({
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

    await router.push({ name: "index", query: { message: "login" } });
    await document.location.reload(booleanTrue);
  } catch (e: any) {
    if (e.status == 401) {
      alert("Wrong email or password");
    }
    console.log(e);
  }
};

onMounted(messageFunction);
</script>
<style lang="">
</style>