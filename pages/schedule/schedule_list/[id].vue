<template lang="">
  <main>
    <div class="container px-4 m-auto">
      <form @submit.prevent v-if="token && showFormCreateItem == true">
        <h1 class="text-4xl mb-2">Create a new event</h1>
        <div>
          <label
            for="date"
            class="block mb-1 mt-3 text-lg font-medium text-gray-900 dark:text-white"
          >
            Date
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
            Time
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
          class="min-w-full dark:bg-indigo-500 dark:text-white"
          >Create</UIButton
        >
      </form>
      <div class="schedule-item-header mt-8 flex flex-wrap justify-between">
        <div class="flex flex-wrap items-center mr-2 flex-1">
          <h1 v-if="showInputTitle == false" class="text-4xl">
            {{ scheduleTitle.title }}
          </h1>
          <UIInput
            type="text"
            placeholder="Change title..."
            v-else
            v-model:value="scheduleTitle.title"
            class="text-4xl"
          />
          <div
            @click="changeTitle"
            v-if="showInputTitle == false && token"
            class="text-2xl cursor-pointer text-indigo-500 hover:text-white active:bg-indigo-600 ease-linear transition-all duration-150"
          >
            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
          </div>
          <UIButton @click="updateTitle" v-else-if="showInputTitle != false">
            Update Title
          </UIButton>
        </div>
        <UIButton
          @click="showForm"
          class="create-btn flex items-center justify-center min-w-full"
          v-if="token"
        >
          <div>
            <font-awesome-icon icon="fa-solid fa-plus" class="mx-1" />
          </div>
          <p>Create</p>
        </UIButton>
      </div>
      <TheScheduleList :schedules="store.schedules" v-if="schedules != ''" />
      <div v-else>Schedules Empty</div>
      <UIButton @click="generatePdf" class="flex items-center">
        <div>
          <font-awesome-icon
            icon="fa-solid fa-file-pdf"
            class="text-3xl mx-2"
          />
        </div>
        <p>Generate Pdf</p>
      </UIButton>
    </div>
  </main>
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
const schedulesForPdf = ref([]);
const showInputTitle = ref(false);
const showFormCreateItem = ref(false);
const dazanId = ref("");
const scheduleTitleId = useRoute().params.id;
const scheduleTitle = ref("");
let newEvent = reactive({
  datetime: "",
  time: "",
  description: "",
  datzanId: dazanId.value,
  ScheduleTitleId: scheduleTitleId,
});
const changeTitle = () => (showInputTitle.value = true);
const updateTitle = async () => {
  let response = await $fetch(
    `${url}/items/schedule_title/${scheduleTitle.value.id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        title: scheduleTitle.value.title,
      },
    }
  );
  showInputTitle.value = false;
};
const showForm = () => (showFormCreateItem.value = !showFormCreateItem.value);
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
const fetchSchedule = async () => {
  try {
    let response = await $fetch(
      `${url}/items/events?filter={ "ScheduleTitleId":"${scheduleTitleId}"}`
    );

    store.schedules = await response.data;
  } catch (error) {
    alert(error)

    useRouter().push('/login')
  }
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
    columnStyles: { fillColor: [0, 255, 0] },
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
<style>
@media (min-width: 768px) {
  .create-btn {
    min-width: 0px !important;
  }
}
</style>
