<template>
  <div>
    <h1>All schedules</h1>
    <div v-for="title in scheduleTitle" :key="title.id">
      <UIButton @click="$router.push(`/schedule/schedule_list/${title.id}`)">{{
        title.title
      }}</UIButton>
    </div>
    <UIInput
      type="text"
      placeholder="Change title..."
      v-if="addTitle == true"
      v-model="title"
    />
    <UIButton @click="addTitle = true" v-if="addTitle == false && store.authenticated"
      >Add new title</UIButton
    >
    <UIButton @click="addNewTitle" v-else-if="addTitle == true"
      >Add title</UIButton
    >
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";

const store = usePiniaStore();

useHead({
  title: "Dazan's schedule",
});

const url = `https://b876ad7f-dd71-4ed3-829a-b2488d40b627.selcdn.net/items`;
const dazanId = useRoute().params.id;
const schedules = ref([]);
const scheduleTitle = ref("");
const addTitle = ref(false);
const title = ref("");
const fetchSchedule = async () => {
  let response = await $fetch(`${url}/schedule?filter={ "dazanId":${dazanId}}`);

  schedules.value = await response.data;
};
const fetchScheduleTitle = async () => {
  try {
    let response = await $fetch(
      `${url}/schedule_title?filter={ "dazanId":${dazanId}}`
    );

    scheduleTitle.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const addNewTitle = async () => {
  return await $fetch(`${url}/schedule_title`, {
    method: "POST",
    body: {
      title: title.value,
      dazanId: dazanId,
    },
  }).then(() => document.location.reload(true));
};
const setLocalStorage = () => localStorage.setItem("dazanId", dazanId);

onMounted(() => {
  fetchScheduleTitle();
  fetchSchedule();
  setLocalStorage();
});
</script>
<style lang="">
</style>