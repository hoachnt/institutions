<template>
  <div>
    <div v-for="schedule in schedules" :key="schedule.id">
      <TheScheduleItem
        :schedule="schedule"
        @removeEvent="$emit('removeEvent', schedule.id)"
      />
    </div>
  </div>
</template>
<script setup>
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "assets/fonts/PTSans-normal.js";

const { getItemById } = useDirectusItems();
const props = defineProps({
  schedules: Array,
});
const institution = ref();
const stringMonth = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const fetchInstitution = async () => {
  try {
    institution.value = await getItemById({
      collection: "location",
      id: useRoute().query.location,
    });
  } catch (e) {}
};

onMounted(() => {
  fetchInstitution();
});

const generatePdf = async () => {
  let itemPdf = {
    time: "",
    description: "",
    datetime: "",
  };
  const config = useRuntimeConfig();
  const url = config.public.url;
  let newArray = [];
  let arr = [];
  let response = await $fetch(
    `${url}/items/events?filter={ "location_id":"${useRoute().query.location}"}`
  );

  response.data.map((item) => {
    item.titleDate = item.datetime;
    item.datetime = `${new Date(item.datetime).getDate()}/${
      new Date(item.datetime).getMonth() + 1
    }/${new Date(item.datetime).getFullYear()}`;

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
      titleDate: item.titleDate,
      time: item.time,
      name: item.name,
    };
  });
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: "letter",
  });
  doc.setTextColor(90, 8, 26);
  doc.setFont("PTSans");
  doc
    .setFontSize(25)
    .text(
      `${institution.value.name} - ${
        stringMonth[new Date(itemPdf.titleDate).getMonth()]
      }`,
      0.5,
      1.0
    );
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
  doc.save(`${stringMonth[new Date(itemPdf.titleDate).getMonth()]}.pdf`);
};
</script>
<style lang="">
</style>