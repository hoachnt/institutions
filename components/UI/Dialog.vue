<template>
  <v-dialog class="md:max-w-xl z-50">
    <v-card class="px-4 py-4 bg-white">
      <slot></slot>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
const store = usePiniaStore();
</script>
<style>
</style>