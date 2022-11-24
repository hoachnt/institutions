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
const props = defineProps({
  schedules: Array,
});
</script>
<style lang="">
</style>