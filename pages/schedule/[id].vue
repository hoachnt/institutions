<template lang="">
  <div>
    <h1>Schedule</h1>
    <TheScheduleList :schedules="schedules"/>
  </div>
</template>
<script setup>
const url = `https://b876ad7f-dd71-4ed3-829a-b2488d40b627.selcdn.net/items`;
const dazanId = useRoute().params.id;
const schedules = ref("");

const fetchSchedule = async () => {
  let response = await $fetch(`${url}/schedule?filter={ "dazanId":${dazanId}}`);

  schedules.value = response.data;
};

onMounted(fetchSchedule);
schedules.value = schedules.value.data;
</script>
<style lang="">
</style>