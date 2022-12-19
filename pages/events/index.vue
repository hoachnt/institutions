<template lang="">
  <main>
    <div class="container px-4 m-auto">
      <div class="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <v-chip rounded="pill" size="large">
              <a
                @click="$router.push(`/locations/${useRoute().query.location}`)"
                >Location</a
              >
            </v-chip>
          </li>
          <li>
            <v-chip rounded="pill" size="large">
              <a>Schedules</a>
            </v-chip>
          </li>
        </ul>
      </div>
      <UIInput
        type="text"
        placeholder="New Schedule..."
        v-if="addTitle == true"
        v-model:value="scheduleTitle.title"
        required
        minlength="1"
      />
      <UIButton
        @click="addTitle = true"
        v-if="addTitle == false && token"
        class="min-w-full"
      >
        {{ $t("createANewSchedule") }}
      </UIButton>
      <UIButton
        @click="addNewTitle"
        v-else-if="addTitle == true"
        class="min-w-full"
        >{{ $t("addSchedule") }}</UIButton
      >
      <transition name="fade">
        <TheScheduleTitles
          :scheduleTitles="scheduleTitles"
          v-if="scheduleTitles != ''"
          @removeSchedule="removeSchedule"
        />
        <div
          v-else-if="schedules == '' && token"
          class="text-xl text-gray-400 btn min-w-full my-3"
          @click="addTitle = true"
        >
          {{ $t("dontHaveSchedules") }}
        </div>
      </transition>
    </div>
  </main>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";

useHead({
  title: "Schedules",
});

const token = useDirectusToken();
const store = usePiniaStore();
const config = useRuntimeConfig();
const url = config.public.url;
const addTitle = ref(false);
const schedules = ref([]);
const scheduleTitle = reactive({
  title: "",
  location_id: useRoute().query.location,
});
const scheduleTitleId = useRoute().params.id;
const scheduleTitles = ref("");
const { messageFunction } = messageLogin();

const fetchScheduleTitles = async () => {
  try {
    let response = await $fetch(
      `${url}/items/schedule_title?filter={ "location_id":"${
        useRoute().query.location
      }" }`
    );

    scheduleTitles.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const removeSchedule = async (id) => {
  try {
    await $fetch(`${url}/items/schedule_title/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    await fetchScheduleTitles();
  } catch (error) {
    console.log(error);
  }
};
const addNewTitle = async () => {
  if (scheduleTitle.title != "") {
    const response = await $fetch(`${url}/items/schedule_title`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: scheduleTitle,
    }).then((response) => {
      fetchScheduleTitles();

      useRouter().push({
        name: "events-new",
        query: {
          location: useRoute().query.location,
          scheduleTitleId: response.data.id,
          message: "create_schedule",
        },
      });
    });
  }
};
onMounted(() => {
  fetchScheduleTitles();
  messageFunction();
});
</script>
<style>
@media (min-width: 768px) {
  .create-btn {
    min-width: 0px !important;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
