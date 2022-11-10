<template>
  <div>
    <h1 v-if="showInputTitle == false">{{ scheduleTitle.title }}</h1>
    <input
      type="text"
      placeholder="Change title..."
      v-else
      v-model="scheduleTitle.title"
    />
    <UIButton
      @click="changeTitle"
      v-if="showInputTitle == false && schedules != ''"
      >Change Title</UIButton
    >
    <UIButton
      @click="updateTitle"
      v-else-if="showInputTitle != false && schedules != ''"
      >Update Title</UIButton
    >
    <TheScheduleList :schedules="schedules" v-if="schedules != ''" />
    <div v-else>Schedules Empty</div>
  </div>
</template>
<script setup>
useHead({
  title: "Dasan's schedule",
});

const url = `https://b876ad7f-dd71-4ed3-829a-b2488d40b627.selcdn.net/items`;
const dazanId = useRoute().params.id;
const schedules = ref([]);
const scheduleTitle = ref("");
const showInputTitle = ref(false);
const fetchSchedule = async () => {
  let response = await $fetch(`${url}/schedule?filter={ "dazanId":${dazanId}}`);

  schedules.value = response.data;
};
const fetchScheduleTitle = async () => {
  try {
    let response = await $fetch(
      `${url}/schedule_title?filter={ "dazanId":${dazanId}}`
    );

    scheduleTitle.value = response.data[0];
  } catch (error) {
    console.log(error);
  }
};
const changeTitle = () => (showInputTitle.value = true);
const updateTitle = async () => {
  return await $fetch(`${url}/schedule_title/${scheduleTitle.value.id}`, {
    method: "PATCH",
    body: {
      title: scheduleTitle.value.title,
    },
  }).then(() => document.location.reload(true));
};

onMounted(() => {
  fetchScheduleTitle();
  fetchSchedule();
});
</script>
<style lang="">
</style>