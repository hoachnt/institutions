<template>
  <div>
    <UIDialog v-model="store.dialog">
      <UIInput
        type="text"
        placeholder="Title"
        v-model:value="store.event.title"
      />
      <UIInput
        type="datetime-local"
        placeholder="Start"
        v-model:value="store.event.start"
      />
      <UIInput
        type="datetime-local"
        placeholder="End"
        v-model:value="store.event.end"
      />
      <div class="flex">
        <UIButton class="flex-1 mr-1" @click="store.updateEvent(store.event.id)">{{
          $t("edit")
        }}</UIButton>
        <UIRemoveButton
          v-if="store.loadingEvent == false"
          class="flex-1 ml-1 "
          @click="store.removeEvent(store.event.id)"
          >{{ $t("delete") }}</UIRemoveButton
        >
        <UILoadingButton v-else/>
      </div>
    </UIDialog>
  </div>
</template>
<script setup lang="ts">
const store = usePiniaStore();
</script>
<style lang=""></style>
