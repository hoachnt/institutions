<template lang="">
  <main>
    <TheEventsNewForm />
  </main>
</template>
<script setup lang="ts">
const { messageFunction } = messageLogin();

onMounted(messageFunction)
</script>
<style lang=""></style>