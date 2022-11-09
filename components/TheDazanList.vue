<template lang="">
  <div v-for="dazan in dazans" :key="dazan.id">
    <TheDazanItem :dazan="dazan"/>
  </div>
</template>
<script setup>
const props = defineProps({
  dazans: Array
})
</script>
<style lang="">
  
</style>