<template>
  <main>
    <transition name="fade">
      <div class="m-auto px-4 max-w-3xl">
        <h1 class="my-1 text-4xl">{{ $t("institutions") }}</h1>
        <transition name="fade">
          <TheLocationList
            v-if="locations != ''"
            :locations="store.locations"
          />
        </transition>
        <transition name="fade">
          <UIToast v-if="store.toastVisible == true"
            >Access. {{ store.message }}</UIToast
          >
        </transition>
        <ClientOnly>
          <template fallback-tag="button" #fallback>
            <button class="btn btn-square loading btn-secondary"></button>
          </template>
        </ClientOnly>
      </div>
    </transition>
  </main>
</template>
<script setup>
const store = usePiniaStore();
const user = useDirectusUser();
const config = useRuntimeConfig();
const url = config.public.url;
const token = useDirectusToken();
const locations = ref([]);

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Institutions",
});

if (user.value && store != undefined) {
  const userCreated = ref(user.value.id);

  const fetching = async () => {
    try {
      let response = await $fetch(
        `${url}/items/location?filter={"user_created":"${userCreated.value}"}`,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );

      locations.value = response.data;
      store.locations = locations.value;
    } catch (error) {
      if (error.status == 401) {
        alert("You are not authorized or authorization timed out");

        await store.logOut();
      }
    }
  };
  const { messageFunction } = messageLogin();

  onMounted(() => {
    fetching();
    messageFunction();
  });
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>