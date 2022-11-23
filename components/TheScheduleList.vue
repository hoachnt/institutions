<template>
  <div>
    <div
      v-for="schedule in schedules"
      :key="schedule.id"
      @removeEvent="$emit('removeEvent', schedule.id)"
    >
      <TheScheduleItem :schedule="schedule" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  schedules: Array,
});
</script>
<style lang="">
</style>