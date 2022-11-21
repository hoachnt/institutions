<template lang="">
  <main>
    <div class="container px-4 m-auto">
      <div>
        <TheScheduleTitles :scheduleTitles="scheduleTitles" />
      </div>
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
const scheduleTitles = ref("");
let newEvent = reactive({
  datetime: "",
  time: "",
  description: "",
  datzanId: dazanId.value,
  ScheduleTitleId: scheduleTitleId,
});
// const changeTitle = () => (showInputTitle.value = true);
// const updateTitle = async () => {
//   let response = await $fetch(
//     `${url}/items/schedule_title/${scheduleTitle.value.id}`,
//     {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token.value}`,
//       },
//       body: {
//         title: scheduleTitle.value.title,
//       },
//     }
//   );
//   showInputTitle.value = false;
// };
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
    let response = await $fetch(`${url}/items/schedule_title`);

    scheduleTitles.value = response.data;
  } catch (error) {
    console.log(error);
  }
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
</style>
