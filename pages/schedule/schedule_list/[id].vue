<template lang="">
  <div>
    <h1 v-if="showInputTitle == false">{{scheduleTitle.title}}</h1>
    <input
      type="text"
      placeholder="Change title..."
      v-else
      v-model="scheduleTitle.title"
    />
    <UIButton
      @click="changeTitle"
      v-if="showInputTitle == false && token"
      >Change Title</UIButton
    >
    <UIButton
      @click="updateTitle"
      v-else-if="showInputTitle != false"
      >Update Title</UIButton
    >
    <TheScheduleList
    :schedules="schedules"
    v-if="schedules != ''"
    />
    <div v-else>Schedules Empty</div>
    <form @submit.prevent v-if="token">
      <h1>Create a new event</h1>
      <UIInput placeholder="Date..." type="text" v-model:value="newEvent.date"/>
      <UIInput placeholder="Time..." type="text" v-model:value="newEvent.time"/>
      <UIInput placeholder="Description..." type="text" v-model:value="newEvent.description"/>
      <UIButton @click="createEvent">Create</UIButton>
    </form>
    <UIButton @click="generatePdf">Generate Pdf</UIButton>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const token = useDirectusToken();
const store = usePiniaStore();
const url = `https://se6o31if.directus.app/items`;
const schedules = ref([]);
const schedulesForPdf = ref([]);
const showInputTitle = ref(false);
const dazanId = ref("");
const scheduleTitleId = useRoute().params.id;
const scheduleTitle = ref("");
const newEvent = ref({
  date: "",
  time: "",
  description: "",
  dazanId: "",
  scheduleTitleId: "",
});
const changeTitle = () => (showInputTitle.value = true);
const updateTitle = async () => {
  return await $fetch(`${url}/schedule_title/${scheduleTitle.value.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
    body: {
      title: scheduleTitle.value.title,
    },
  }).then(() => document.location.reload(true));
};
const createEvent = async () => {
  return await $fetch(`${url}/schedule`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${store.token}`,
    },
    body: {
      date: newEvent.value.date,
      time: newEvent.value.time,
      description: newEvent.value.description,
      dazanId: dazanId.value,
      ScheduleTitleId: scheduleTitleId,
    },
  }).then(() => document.location.reload(true));
};
const fetchSchedule = async () => {
  let response = await $fetch(
    `${url}/schedule?filter={ "ScheduleTitleId":"${scheduleTitleId}"}`
  );

  schedules.value = await response.data;
};
const fetchScheduleTitle = async () => {
  try {
    let response = await $fetch(
      `${url}/schedule_title?filter={ "id":${scheduleTitleId}}`
    );

    scheduleTitle.value = response.data[0];
  } catch (error) {
    console.log(error);
  }
};
const getLocalStorage = () => {
  dazanId.value = localStorage.getItem("dazanId");
};
const generatePdf = async () => {
  let response = await $fetch(
    `${url}/schedule?filter={ "ScheduleTitleId":"${scheduleTitleId}"}`
  );

  response.data.map((item) => {
    delete item.id;
    delete item.dazanId;
    delete item.ScheduleTitleId;
    delete item.user_created;
  });

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "letter",
  });
  doc.setFontSize(16).text(scheduleTitle.value.title, 0.5, 1.0);
  doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
  doc.autoTable({
    body: response.data,
    margin: { left: 0.5, top: 1.5 },
  });
  doc.save("generatePDF.pdf");
};
onMounted(() => {
  getLocalStorage();
  fetchScheduleTitle();
  fetchSchedule();
});
</script>
<style lang="">
</style>