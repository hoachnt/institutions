<template>
  <div>
    <UIButton @click="$router.push('/')">Home</UIButton>
    <UIButton @click="$router.push('/register')" v-if="!token"
      >Register</UIButton
    >
    <UIButton @click="$router.push('/login')" v-if="!token">Login</UIButton>
  </div>
</template>
<script setup>
const token = useDirectusToken();
</script>
<style lang="">
</style>