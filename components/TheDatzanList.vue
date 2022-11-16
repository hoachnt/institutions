<template lang="">
<div class="flex justify-around flex-wrap">
  <div v-for="datzan in datzans" :key="datzan.id" class="w-full xl:w-96 p-6 bg-white rounded-md shadow-md dark:bg-neutral-800 my-2">
    <TheDazanItem :datzan="datzan"/>
  </div>
</div>

</template>
<script setup>
const props = defineProps({
  datzans: Array,
});
</script>
<style lang="">
</style>