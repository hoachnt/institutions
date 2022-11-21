<template lang="">
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
      @click="$router.push('/events/new')"
      class="create-btn flex items-center justify-center min-w-full"
      v-if="token"
    >
      <div>
        <font-awesome-icon icon="fa-solid fa-plus" class="mx-1" />
      </div>
      <p>Create</p>
    </UIButton>
  </div>
  <TheScheduleList :schedules="schedules" v-if="schedules != ''" />
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
</template>
<script setup>
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "assets/fonts/PTSans-normal.js";

const token = useDirectusToken();
const store = usePiniaStore();
const config = useRuntimeConfig();

const props = defineProps({
  scheduleTitle: {
    type: Object,
  },
});

const showInputTitle = ref(false);
const url = config.public.url;
const schedules = ref([]);

const fetchSchedule = async () => {
  try {
    let response = await $fetch(
      `${url}/items/events?filter={"ScheduleTitleId":"${props.scheduleTitle.id}"}`
    );

    schedules.value = await response.data;
  } catch (error) {
    alert(error);
  }
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
    `${url}/items/events?filter={ "ScheduleTitleId":"${props.scheduleTitle.id}"}`
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
  doc.setTextColor(90, 8, 26);
  doc.setFont("PTSans");
  doc.setFontSize(25).text(props.scheduleTitle.title, 0.5, 1.0);
  doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
  doc.autoTable({
    styles: {
      font: "PTSans",
      lineWidth: {
        bottom: 0.08,
      },
      textColor: [0, 0, 0],
      fillColor: [255, 255, 255],
      cellPadding: 0.2,
      fontSize: 15,
    },
    columnStyles: {
      fillColor: [253, 218, 13],
    },
    theme: "plain",
    body: newArray,
    columns: [
      { header: "Дата", dataKey: itemPdf.datetime },
      { header: "Время", dataKey: itemPdf.time },
      { header: "Описание", dataKey: itemPdf.description },
    ],

    margin: { top: 1.5 },
  });
  doc.save(`${props.scheduleTitle.title}.pdf`);
};

onMounted(() => {
  fetchSchedule();
});
</script>
<style lang=""></style>;
