<template>
  <v-dialog class="md:max-w-xl">
    <v-card class="px-4 py-4 bg-neutral">
      <slot></slot>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
const store = usePiniaStore();
</script>
<style>
</style>