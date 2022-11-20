<template>
  <main>
    <div class="container m-auto px-4">
      <div class="schedule-header mb-3 flex justify-between items-center">
        <h1 class="text-4xl">All schedules</h1>
        <UIButton @click="showQrCode">
          <font-awesome-icon :icon="['fa', 'fa-qrcode']" class="text-xl" />
        </UIButton>
        <div
          class="
            qr-code-wrapper
            fixed
            min-w-full min-h-screen
            top-0
            left-0
            flex
            justify-center
            items-center
          "
          v-if="qrCode == true"
          @click="qrCode = false"
        >
          <qrcode-vue
            :value="value"
            :size="size"
            level="H"
            class="rounded-xl"
          />
        </div>
      </div>
      <div v-for="title in scheduleTitle" :key="title.id" class="flex">
        <UIButton
          @click="$router.push(`/schedule/schedule_list/${title.id}`)"
          class="
            block
            py-2
            px-4
            dark:text-white
            rounded-md
            cursor-pointer
            dark:bg-indigo-500
            flex-1
          "
        >
          {{ title.title }}
        </UIButton>
        <UIRemoveButton
          @click="removeSchedule(title.id)"
          class="ml-2"
          v-if="token"
        >
          <font-awesome-icon icon="fa-solid fa-trash" />
        </UIRemoveButton>
      </div>
      <UIInput
        type="text"
        placeholder="New Schedule..."
        v-if="addTitle == true"
        v-model:value="title"
      />
      <UIButton
        @click="addTitle = true"
        v-if="addTitle == false && token"
        class="min-w-full"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </UIButton>
      <UIButton
        @click="addNewTitle"
        v-else-if="addTitle == true"
        class="min-w-full"
        >Add schedule</UIButton
      >
    </div>
  </main>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
import QrcodeVue from "qrcode.vue";

const user = useDirectusUser();
const store = usePiniaStore();
const config = useRuntimeConfig();

defineComponent({
  QrcodeVue,
});

useHead({
  title: "Dazan's schedule",
});
const token = useDirectusToken();

const qrCode = ref(false);
const value = ref("");
const size = ref(300);
const url = config.public.url;
const websiteUrl = getWebUrl();
const datzanId = useRoute().params.id;
const scheduleTitle = ref("");
const addTitle = ref(false);
const title = ref("");
const fetchScheduleTitle = async () => {
  try {
    let response = await $fetch(
      `${url}/items/schedule_title?filter={ "datzanId":"${datzanId}"}`
    );

    scheduleTitle.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const addNewTitle = async () => {
  return await $fetch(`${url}/items/schedule_title`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: {
      title: title.value,
      datzanId: datzanId,
    },
  }).then(() => fetchScheduleTitle());
};
const setLocalStorage = () => localStorage.setItem("datzanId", datzanId);
const generateQrCode = () => {
  value.value = `${websiteUrl}`;
};
const showQrCode = () => (qrCode.value = !qrCode.value);
const removeSchedule = async (id) => {
  try {
    scheduleTitle.value = scheduleTitle.value.filter((items) => items.id != id);

    let response = await $fetch(`${url}/items/schedule_title/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  } catch (error) {}
};
function getWebUrl() {
  if (typeof window !== 'undefined') {
    return window.location.href;
  } else {
    console.log("it is server side");
  }
}

onMounted(() => {
  fetchScheduleTitle();
  setLocalStorage();
  generateQrCode();
  getWebUrl();
});
</script>
<style>
.qr-code-wrapper {
  background: rgba(0, 0, 0, 0.6);
}
</style>
