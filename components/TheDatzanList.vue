<template lang="">
<div class="flex justify-around flex-wrap">
  <div v-for="datzan in datzans" :key="datzan.id" class="lg:flex-1">
    <TheDazanItem :datzan="datzan" />
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