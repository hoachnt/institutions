<template lang="">
  <div>
    <div>{{ new Date(schedule.date).getDate() }}/{{ new Date(schedule.date).getMonth() }}/{{ new Date(schedule.date).getFullYear() }}</div>
    <div>{{schedule.time}}</div>
    <div>{{schedule.description}}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  schedule: Object,
});
</script>
<style lang="">
</style>