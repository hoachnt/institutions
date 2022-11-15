<template lang="">
  <div v-for="datzan in datzans" :key="datzan.id">
    <TheDazanItem :datzan="datzan"/>
  </div>
</template>
<script setup>
const props = defineProps({
  datzans: Array
})
</script>
<style lang="">
  
</style>