<template>
  <div>
    <UIButton @click="$router.push('/')">Home</UIButton>
    <UIButton @click="$router.push('/register')" v-if="!store.authenticated">Register</UIButton>
    <UIButton @click="$router.push('/login')" v-if="!store.authenticated">Login</UIButton>
  </div>
</template>
<script setup>
import { usePiniaStore } from '~~/stores/PiniaStore';

const store = usePiniaStore()
</script>
<style lang="">
  
</style>