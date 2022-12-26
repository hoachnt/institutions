<template lang="">
<div class="flex justify-around flex-wrap">
  <div v-for="location in locations" :key="location.id" class="min-w-full px-2">
    <TheLocationItem :location="location" />
  </div>
</div>

</template>
<script setup>
const props = defineProps({
  locations: Array,
});
</script>
<style lang="">
</style>