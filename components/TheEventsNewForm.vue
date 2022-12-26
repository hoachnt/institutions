<template lang="">
  <main>
    <div class="m-auto">
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
        <h1 class="text-5xl font-normal mb-6">{{ $t("createANewEvent") }}</h1>
        <div>
          <label
            for="title"
            class="block mb-1 mt-3 text-xl font-medium text-content"
          >
            {{ $t("title") }}
          </label>
          <UIInput
            :placeholder="$t('title')"
            type="text"
            v-model:value="newEvent.title"
            id="name"
            required
          />
        </div>
        <div>
          <label
            for="date"
            class="block mb-1 mt-3 text-xl font-medium text-content"
          >
            {{ $t('start') }}
          </label>
          <UIInput
            type="datetime-local"
            v-model:value="newEvent.start"
            id="date"
            required
          />
        </div>
        <div>
          <label
            for="date"
            class="block mb-1 mt-3 text-xl font-medium text-content"
          >
            {{ $t('end') }}
          </label>
          <UIInput
            type="datetime-local"
            v-model:value="newEvent.end"
            id="date"
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
          class="min-w-full"
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
  description: "",
  title: "",
  start: "",
  end: "",
  location_id: useRoute().query.location,
});
const isDisabled = ref(false);

const createEvent = async () => {
  try {
    if (newEvent.start != "" && newEvent.end != "") {
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
