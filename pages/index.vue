<template>
  <main>
    <transition name="fade">
      <div class="m-auto px-4 max-w-3xl">
        <h1 class="my-1 text-4xl">{{ $t("institutions") }}</h1>
        <transition name="fade">
          <TheLocationList
            :locations="store.locations"
            v-if="locations != ''"
          />
        </transition>
        <transition name="fade">
          <UIToast v-if="store.toastVisible == true"
            >Access. {{ message }}</UIToast
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
import { usePiniaStore } from "@/stores/PiniaStore";

const store = usePiniaStore();
const user = useDirectusUser();

const config = useRuntimeConfig();
const url = config.public.url;

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Institutions",
});

if (user.value && store != undefined) {
  const userCreated = ref(user.value.id);

  const { message, messageFunction } = messageLogin();
  const { locations } = fetchLocations(url);

  onMounted(messageFunction);
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