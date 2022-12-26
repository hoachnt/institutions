<template lang="">
  <main>
    <div class="m-auto">
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
      <UIButton
        v-if="token"
        @click="
          $router.push({
            name: 'events-new',
            query: {
              location: useRoute().query.location,
              scheduleTitleId: scheduleTitle.id,
            },
          })
        "
        class="min-w-full mb-10"
      >
        {{ $t("createANewEvent") }}
      </UIButton>
      <TheCalendar />
      <transition name="fade">
        <TheScheduleList
          :schedules="store.schedules"
          v-if="schedules != ''"
          @removeEvent="removeEvent"
        />
        <div
          v-else-if="schedules == '' && token"
          class="text-xl text-gray-400 btn min-w-full my-3"
          @click="
            $router.push({
              name: 'events-new',
              query: {
                location: useRoute().query.location,
                scheduleTitleId: scheduleTitle.id,
              },
            })
          "
        >
          {{ $t("dontHaveSchedules") }}
        </div>
      </transition>
    </div>
  </main>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "assets/fonts/PTSans-normal.js";

useHead({
  title: "Schedules",
});

const user = useDirectusUser();
const emit = defineEmits(["removeSchedule"]);
const showInputTitle = ref(false);
const visible = false;
const title = ref("");
const dialog = ref(false);
const token = useDirectusToken();
const store = usePiniaStore();
const config = useRuntimeConfig();
const url = config.public.url;
const addTitle = ref(false);
const scheduleTitle = reactive({
  title: "",
  location_id: useRoute().query.location,
});
const scheduleTitleId = useRoute().params.id;
const scheduleTitles = ref("");
const { messageFunction } = messageLogin();

const removeEvent = async (id) => {
  try {
    let response = await $fetch(`${url}/items/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    dialog.value = false;

    await store.fetchSchedule();
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  messageFunction();
  store.fetchSchedule();
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
