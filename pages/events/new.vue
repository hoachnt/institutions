<template lang="">
  <main>
    <div class="container px-4 m-auto">
      <form @submit.prevent v-if="token">
        <h1 class="text-4xl mb-2">Create a new event</h1>
        <div>
          <label
            for="date"
            class="block mb-1 mt-3 text-lg font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <UIInput
            type="date"
            v-model:value="newEvent.datetime"
            id="date"
            required
          />
        </div>
        <div>
          <label
            for="time"
            class="block mb-1 mt-3 text-lg font-medium text-gray-900 dark:text-white"
          >
            Time
          </label>
          <UIInput
            placeholder="Time"
            type="time"
            v-model:value="newEvent.time"
            id="time"
            required
          />
        </div>
        <UIInput
          placeholder="Description"
          type="text"
          v-model:value="newEvent.description"
        />
        <UIButton
          @click="createEvent"
          class="min-w-full dark:bg-indigo-500 dark:text-white"
          >Create</UIButton
        >
      </form>
    </div>
  </main>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";

useHead({
  title: "Schedule's",
});

const token = useDirectusToken();
const store = usePiniaStore();
const config = useRuntimeConfig();

const url = config.public.url;
const showInputTitle = ref(false);
const dazanId = ref("");
const scheduleTitleId = useRoute().params.id;
let newEvent = reactive({
  datetime: "",
  time: "",
  description: "",
  datzanId: dazanId.value,
  ScheduleTitleId: scheduleTitleId,
});
const createEvent = async () => {
  try {
    await $fetch(`${url}/items/events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: newEvent,
    });
    await useRouter().push('/events')
  } catch (error) {
    alert(error);

    useRouter().push("/login");
  }
};
</script>
<style lang=""></style>
