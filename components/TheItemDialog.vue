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
      <h1
        v-if="store.loadingEvent == false && store.showDeleteButton == true"
        class="pt-3 pb-1"
      >
        {{ $t("questionBeforeDeletion") }}
      </h1>
      <div class="flex">
        <UIButton
          class="flex-1 mr-1 bg-neutral flex items-center justify-center"
          @click="store.updateEvent(store.event.id)"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" />
          <p class="ml-2">{{ $t("edit") }}</p>
        </UIButton>
        <UIRemoveButton
          v-if="store.loadingEvent == false && !store.showDeleteButton"
          @click="
            store.showDeleteButton = true;
            store.loading = true;
          "
          class="flex-1 ml-1 flex items-center justify-center"
        >
          <font-awesome-icon icon="fa-solid fa-trash" />
          <p class="ml-2">{{ $t("delete") }}</p>
        </UIRemoveButton>
        <UIRemoveButton
          @click="store.removeEvent(store.event.id)"
          v-if="store.loadingEvent == false && store.showDeleteButton == true"
        >
          {{ $t("yes") }}, {{ $t("delete") }}
        </UIRemoveButton>
        <UILoadingButton
          v-else-if="
            store.loadingEvent == true && store.showDeleteButton == true
          "
        />
      </div>
    </UIDialog>
  </div>
</template>
<script setup lang="ts">
const store = usePiniaStore();
</script>
<style lang=""></style>
