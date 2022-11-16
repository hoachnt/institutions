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
      <UIInput type="date" v-model:value="newEvent.datetime" />
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
import "assets/fonts/PTSans-normal.js";

useHead({
  title: "Schedule's",
});

const token = useDirectusToken();
const store = usePiniaStore();
const config = useRuntimeConfig();

const url = config.public.url;
const schedules = ref([]);
const schedulesForPdf = ref([]);
const showInputTitle = ref(false);
const dazanId = ref("");
const scheduleTitleId = useRoute().params.id;
const scheduleTitle = ref("");
const newEvent = ref({
  datetime: "",
  time: "",
  description: "",
  datzanId: "",
  scheduleTitleId: "",
});
const changeTitle = () => (showInputTitle.value = true);
const updateTitle = async () => {
  return await $fetch(`${url}/items/schedule_title/${scheduleTitle.value.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: {
      title: scheduleTitle.value.title,
    },
  }).then(() => document.location.reload(true));
};
const createEvent = async () => {
  console.log(newEvent.value.datetime);
  return await $fetch(`${url}/items/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: {
      datetime: newEvent.value.datetime,
      time: newEvent.value.time,
      description: newEvent.value.description,
      datzanId: dazanId.value,
      ScheduleTitleId: scheduleTitleId,
    },
  }).then(() => document.location.reload(true));
};
const fetchSchedule = async () => {
  let response = await $fetch(
    `${url}/items/events?filter={ "ScheduleTitleId":"${scheduleTitleId}"}`
  );

  schedules.value = await response.data;
};
const fetchScheduleTitle = async () => {
  try {
    let response = await $fetch(
      `${url}/items/schedule_title?filter={ "id":${scheduleTitleId}}`
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
  let itemPdf = {
    time: "",
    description: "",
    datetime: "",
  };
  let newArray = [];
  let arr = [];
  let response = await $fetch(
    `${url}/items/events?filter={ "ScheduleTitleId":"${scheduleTitleId}"}`
  );

  response.data.map((item) => {
    item.datetime = `${new Date(item.datetime).getDate()}/${new Date(
      item.datetime
    ).getMonth()}/${new Date(item.datetime).getFullYear()}`;

    delete item.id;
    delete item.datzan_id;
    delete item.ScheduleTitleId;
    delete item.user_created;
    delete item.sort;
    delete item.status;
    delete item.user_updated;
    delete item.date_created;
    delete item.date_updated;

    arr = [item.datetime, item.time, item.description];

    newArray.push(arr);

    itemPdf = {
      description: item.description,
      datetime: item.datetime,
      time: item.time,
    };
  });
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "letter",
  });
  doc.setFont("PTSans");
  doc.setFontSize(16).text(scheduleTitle.value.title, 0.5, 1.0);
  doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
  doc.autoTable({
    styles: {
      font: "PTSans",
      lineWidth: 0.02,
      fillColor: [253, 218, 13],
      textColor: [0, 0, 0],
    },
    columnStyles: {  fillColor: [0, 255, 0] },
    theme: "grid",
    body: newArray,
    columns: [
      { header: "Date", dataKey: itemPdf.datetime },
      { header: "Time", dataKey: itemPdf.time },
      { header: "Description", dataKey: itemPdf.description },
    ],

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