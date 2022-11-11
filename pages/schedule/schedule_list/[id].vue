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
      v-if="showInputTitle == false"
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
    <form @submit.prevent>
      <h1>Create a new event</h1>
      <UIInput placeholder="Date..." type="text" v-model:value="newEvent.date"/>
      <UIInput placeholder="Time..." type="text" v-model:value="newEvent.time"/>
      <UIInput placeholder="Description..." type="text" v-model:value="newEvent.description"/>
      <UIButton @click="createEvent">Create</UIButton>
    </form>
  </div>
</template>
<script setup>
const url = `https://b876ad7f-dd71-4ed3-829a-b2488d40b627.selcdn.net/items`;
const schedules = ref([]);
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
    body: {
      title: scheduleTitle.value.title,
    },
  }).then(() => document.location.reload(true));
};
const createEvent = async () => {
  return await $fetch(`${url}/schedule`, {
    method: "POST",
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

onMounted(() => {
  getLocalStorage();
  fetchScheduleTitle();
  fetchSchedule();
});
</script>
<style lang="">
</style>