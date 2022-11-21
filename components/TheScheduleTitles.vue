<template>
  <main>
    <TheScheduleTitle
      v-for="scheduleTitle in scheduleTitles"
      :key="scheduleTitle.id"
      :scheduleTitle="scheduleTitle"
    />
  </main>
</template>
<script setup>
const props = defineProps({
  scheduleTitles: {
    type: Array,
  },
});
</script>
<style lang=""></style>
