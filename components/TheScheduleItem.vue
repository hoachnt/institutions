<template lang="">
  <div>
    <div>{{schedule.date}}</div>
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