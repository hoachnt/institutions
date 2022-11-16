<template lang="">
<div class="flex justify-around flex-wrap">
  <div v-for="datzan in datzans" :key="datzan.id" class="flex-1 mx-1 p-6 rounded-md shadow-md bg-neutral-800 my-1">
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