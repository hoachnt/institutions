<template lang="">
  <div>
    <div>{{dazan.title}}</div>
    <div>{{dazan.address}}</div>
    <UIButton>Schedule</UIButton>
  </div>
</template>
<script setup>
const props = defineProps({
  dazan: Object
})
</script>
<style lang="">
  
</style>