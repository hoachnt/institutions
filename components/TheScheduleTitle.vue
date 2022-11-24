<template lang="">
  <div class="schedule-item-header mt-8 flex flex-wrap justify-between">
    <div class="flex flex-wrap items-center mr-3 flex-1 mb-3 md:mb-0">
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
      <UIButton @click="updateTitle" v-if="showInputTitle != false">
        Update Title
      </UIButton>
    </div>
    <ul
      class="menu menu-horizontal bg-neutral rounded-xl min-w-full flex justify-between md:min-w-0"
      v-if="token"
    >
      <li>
        <a
          @click="changeTitle"
          class="tooltip flex items-center"
          data-tip="Update"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
        </a>
      </li>
      <li>
        <a
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
          <div>
            <font-awesome-icon icon="fa-solid fa-plus" class="mr-1" />
          </div>
          <p>Create</p>
        </a>
      </li>
      <li>
        <a
          class="tooltip flex items-center"
          data-tip="Delete"
          @click="$emit('removeSchedule', scheduleTitle.id)"
        >
          <font-awesome-icon icon="fa-solid fa-trash" />
        </a>
      </li>
    </ul>
  </div>
  <TheScheduleList
    :schedules="schedules"
    v-if="schedules != ''"
    @removeEvent="removeEvent"
  />
  <div v-else class="text-center text-error text-3xl">Schedule is Empty</div>
  <UIButton
    @click="generatePdf"
    class="flex items-center"
    v-if="schedules != ''"
  >
    <div>
      <font-awesome-icon icon="fa-solid fa-file-pdf" class="text-3xl mx-2" />
    </div>
    <p>Generate Pdf</p>
  </UIButton>
</template>
<script setup>
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "assets/fonts/PTSans-normal.js";

const user = useDirectusUser();
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
const visible = false;
const title = ref("");
const scheduleTitles = ref("");

const changeTitle = () => (showInputTitle.value = !showInputTitle.value);
const updateTitle = async () => {
  let response = await $fetch(
    `${url}/items/schedule_title/${props.scheduleTitle.id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        title: props.scheduleTitle.title,
      },
    }
  );
  showInputTitle.value = false;
};
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
const removeEvent = async (id) => {
  console.log('nice')
  try {
    let response = await $fetch(`${url}/items/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    await fetchSchedule();
  } catch (error) {
    console.log(error);
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
<style lang=""></style>
;
