<template>
  <main>
    <ClientOnly>
      <template #default>
        <transition name="fade">
          <div class="m-auto max-w-3xl">
            <transition name="fade">
              <TheLocationList
                v-if="store.locations != ''"
                :locations="store.locations"
              />
              <div
                v-else
                class="text-xl text-gray-400 btn min-w-full my-3"
                @click="$router.push('/locations/new')"
              >
                {{ $t("dontHaveInstitutions") }}
              </div>
            </transition>
          </div>
        </transition>
      </template>
      <template #fallback>
        <UILoadingButton />
      </template>
    </ClientOnly>
  </main>
</template>
<script setup>
const store = usePiniaStore();
const user = useDirectusUser();
const config = useRuntimeConfig();
const url = config.public.url;
const token = useDirectusToken();
const userCreated = ref(user.value.id);
const { messageFunction } = messageLogin();

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Institutions",
});

const fetching = async () => {
  try {
    let locations = await $fetch(
      `${url}/items/location?filter={"user_created":"${userCreated.value}"}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    store.locations = locations.data;
  } catch (error) {
    if (error.status == 401) {
      alert("You are not authorized or authorization timed out");

      await store.logOut();
    }
  }
};

onMounted(() => {
  fetching();
  messageFunction();
});
</script>
<style>
</style>