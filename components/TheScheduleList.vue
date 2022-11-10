<template lang="">
  <div v-for="schedule in schedules" :key="schedule.id">
    <TheScheduleItem :schedule="schedule"/>
  </div>
</template>
<script setup>
const props = defineProps({
  schedules: Array,
});
</script>
<style lang="">
</style>