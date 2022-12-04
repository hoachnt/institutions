<template lang="">
  <main>
    <div class="container px-4 m-auto">
      <div class="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <a
              @click="
                $router.push({
                  name: 'events',
                  query: { location: useRoute().query.location },
                })
              "
              >Schedules</a
            >
          </li>
          <li><a>New</a></li>
        </ul>
      </div>
      <form @submit.prevent v-if="token">
        <h1 class="text-4xl mb-2">{{ $t("createANewEvent") }}</h1>
        <div>
          <label
            for="name"
            class="block mb-1 mt-3 text-lg font-medium text-gray-900 dark:text-white"
          >
            {{ $t("name") }}
          </label>
          <UIInput
            placeholder="Name"
            type="text"
            v-model:value="newEvent.name"
            id="name"
            required
          />
        </div>
        <div>
          <label
            for="date"
            class="block mb-1 mt-3 text-lg font-medium text-gray-900 dark:text-white"
          >
            {{ $t("date") }}
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
            {{ $t("time") }}
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
          class="min-w-full text-white"
          >{{ $t("create") }}</UIButton
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
let newEvent = reactive({
  datetime: "",
  time: "",
  description: "",
  name: "",
  location_id: useRoute().query.location,
  ScheduleTitleId: useRoute().query.scheduleTitleId,
});

const createEvent = async () => {
  try {
    if (newEvent.datetime != "" && newEvent.time != "") {
      await $fetch(`${url}/items/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: newEvent,
      });
      await useRouter().push({
        name: "events",
        query: { location: useRoute().query.location },
      });
    }
  } catch (error) {
    if (error.status == 401) {
      alert(`Error ${error.status}`);
      useRouter().push("/login");
    }
    alert(error);
  }
};
</script>
<style lang=""></style>
