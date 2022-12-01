<template>
  <main>
    <TheScheduleTitle
      v-for="scheduleTitle in scheduleTitles"
      :key="scheduleTitle.id"
      :scheduleTitle="scheduleTitle"
      @removeSchedule="$emit('removeSchedule', scheduleTitle.id)"
    />
  </main>
</template>
<script setup>
const props = defineProps({
  scheduleTitles: {},
});
</script>
<style lang=""></style>