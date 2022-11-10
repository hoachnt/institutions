<template lang="">
  <div>
    <div>{{dazan.title}}</div>
    <div>{{dazan.address}}</div>
    <nuxt-link to="/schedule">Schedule</nuxt-link>
  </div>
</template>
<script setup>
const props = defineProps({
  dazan: Object,
});
</script>
<style lang="">
</style>