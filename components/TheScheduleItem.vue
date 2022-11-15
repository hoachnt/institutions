<template lang="">
  <div>
    <div>{{ new Date(schedule.datetime).getDate() }}/{{ new Date(schedule.datetime).getMonth() }}/{{ new Date(schedule.datetime).getFullYear() }}</div>
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