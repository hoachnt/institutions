<template>
  <div>
    <h1>All schedules</h1>
    <div v-for="title in scheduleTitle" :key="title.id">
      <UIButton @click="$router.push(`/schedule/schedule_list/${title.id}`)">{{
        title.title
      }}</UIButton>
    </div>
    <UIInput
      type="text"
      placeholder="Change title..."
      v-if="addTitle == true"
      v-model:value="title"
    />
    <UIButton
      @click="addTitle = true"
      v-if="addTitle == false && token"
      >Add new title</UIButton
    >
    <UIButton @click="addNewTitle" v-else-if="addTitle == true"
      >Add title</UIButton
    >
    <qrcode-vue :value="value" :size="size" level="H"/>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
import QrcodeVue from "qrcode.vue";

const store = usePiniaStore();

defineComponent({
  QrcodeVue
})

useHead({
  title: "Dazan's schedule",
});
const token = useDirectusToken();

const value = ref('')
const size = ref(300)
const url = `https://se6o31if.directus.app/items`;
const webSiteUrl = 'https://statuesque-custard-f1dc78.netlify.app'
const dazanId = useRoute().params.id;
const scheduleTitle = ref("");
const addTitle = ref(false);
const title = ref("");
const fetchScheduleTitle = async () => {
  try {
    let response = await $fetch(
      `${url}/schedule_title?filter={ "dazanId":${dazanId}}`
    );

    scheduleTitle.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const addNewTitle = async () => {
  return await $fetch(`${url}/schedule_title`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: {
      title: title.value,
      dazanId: dazanId,
    },
  }).then(() => document.location.reload(true));
};
const setLocalStorage = () => localStorage.setItem("dazanId", dazanId);
const generateQrCode = () => {
  value.value = `${webSiteUrl}/schedule/${useRoute().params.id}`
}

onMounted(() => {
  fetchScheduleTitle();
  setLocalStorage();
  generateQrCode()
});
</script>
<style lang="">
</style>