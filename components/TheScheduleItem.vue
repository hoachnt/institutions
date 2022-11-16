<template lang="">
  <div class="block min-w-full p-6 rounded-lg shadow-md dark:bg-neutral-800 my-3">
    <div class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ new Date(schedule.datetime).getDate() }}/{{ new Date(schedule.datetime).getMonth() }}/{{ new Date(schedule.datetime).getFullYear() }}</div>
    <div class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{schedule.time}}</div>
    <div class="font-normal text-gray-700 dark:text-gray-400">{{schedule.description}}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  schedule: Object,
});
</script>
<style lang="">
</style>