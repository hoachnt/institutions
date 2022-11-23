<template lang="">
  <main>
    <div class="container px-4 m-auto">
      <UIInput
        type="text"
        placeholder="New Schedule..."
        v-if="addTitle == true"
        v-model:value="title"
      />
      <UIButton
        @click="addTitle = true"
        v-if="addTitle == false && token"
        class="min-w-full tooltip tooltip-bottom" data-tip="Create Schedule"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </UIButton>
      <UIButton
        @click="addNewTitle"
        v-else-if="addTitle == true"
        class="min-w-full"
        >Add schedule</UIButton
      >
      <transition name="fade">
        <div>
          <TheScheduleTitles
            :scheduleTitles="scheduleTitles"
            v-if="scheduleTitles != ''"
          />
          <h1 v-else class="text-3xl text-error text-center">
            You do not have events
          </h1>
        </div>
      </transition>
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
const dazanId = ref("");
const addTitle = ref(false);
const title = ref("");
const scheduleTitleId = useRoute().params.id;
const scheduleTitles = ref("");
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
    }).then(() => fetchSchedule());
  } catch (error) {
    alert(error);

    useRouter().push("/login");
  }
};
const fetchScheduleTitles = async () => {
  try {
    let response = await $fetch(
      `${url}/items/schedule_title?filter={ "datzanId":"${
        useRoute().query.location
      }" }`
    );

    scheduleTitles.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const addNewTitle = async () => {
  return await $fetch(`${url}/items/schedule_title`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: {
      title: title.value,
      datzanId: useRoute().query.location,
    },
  }).then(() => fetchScheduleTitles());
};
const getLocalStorage = () => {
  dazanId.value = localStorage.getItem("dazanId");
};
onMounted(() => {
  getLocalStorage();
  fetchScheduleTitles();
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
