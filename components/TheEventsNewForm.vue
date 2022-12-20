<template lang="">
  <main>
    <div class="container px-4 m-auto">
      <div class="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <v-chip rounded="pill" size="large">
              <a
                @click="
                  $router.push({
                    name: 'events',
                    query: { location: useRoute().query.location },
                  })
                "
                >Schedules</a
              >
            </v-chip>
          </li>
          <li>
            <v-chip rounded="pill" size="large">
              <a>New</a>
            </v-chip>
          </li>
        </ul>
      </div>
      <form @submit.prevent v-if="token">
        <h1 class="text-4xl mb-2">{{ $t("createANewEvent") }}</h1>
        <div>
          <label
            for="name"
            class="block mb-1 mt-3 text-lg font-medium text-content"
          >
            {{ $t("name") }}
          </label>
          <UIInput
            :placeholder="$t('name')"
            type="text"
            v-model:value="newEvent.name"
            id="name"
            required
          />
        </div>
        <div>
          <label
            for="date"
            class="block mb-1 mt-3 text-lg font-medium text-content"
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
            class="block mb-1 mt-3 text-lg font-medium text-content"
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
          :placeholder="$t('description')"
          type="text"
          v-model:value="newEvent.description"
        />
        <UIButton
          @click="createEvent"
          class="min-w-full text-white"
          :disabled="isDisabled"
          v-if="!isDisabled"
          >{{ $t("create") }}</UIButton
        >
        <UILoadingButton v-else />
      </form>
    </div>
  </main>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";

useHead({
  title: "Create schedule",
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
});
const isDisabled = ref(false);

const createEvent = async () => {
  try {
    if (newEvent.datetime != "" && newEvent.time != "") {
      isDisabled.value = true;

      await $fetch(`${url}/items/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: newEvent,
      });
      await useRouter().push({
        name: "events",
        query: { location: useRoute().query.location, message: "create_event" },
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
