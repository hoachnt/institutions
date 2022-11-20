<template>
  <div
    class="
      container
      w-2/4
      min-w-full
      sm:min-w-0
      m-0
      sm:m-auto
      flex
      justify-center
      px-3
    "
  >
    <div
      class="
        datsan
        mx-1
        rounded-md
        shadow-md
        bg-neutral
        my-2
        min-w-full
        relative
        lg:w-auto
      "
    >
      <div>
        <img
          class="rounded-t-lg"
          :src="`https://directus.hoach.skryonline.com/assets/${datzan.img}`"
          alt=""
        />
      </div>
      <div class="p-5">
        <div>
          <h5
            class="
              mb-2
              text-2xl
              font-bold
              tracking-tight
              text-gray-900
              dark:text-white
            "
          >
            {{ datzan.name }}
          </h5>
        </div>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ datzan.description }}
        </p>
        <p class="mb-3 font-normal text-gray-400">
          {{ datzan.address }}
        </p>
        <div class="flex justify-between items-center">
          <a
            @click="$router.push(`/schedule/${datzan.id}`)"
            class="
              inline-flex
              items-center
              px-3
              py-2
              text-sm
              font-medium
              text-center text-white
              bg-indigo-600
              rounded-lg
              hover:bg-blue-800
              focus:ring-4 focus:outline-none focus:ring-blue-300
              dark:bg-indigo-600
              dark:hover:bg-indigo-700
              dark:focus:ring-indigo-800
              ease-linear
              transition-all
              duration-150
            "
          >
            Schedule
            <svg
              aria-hidden="true"
              class="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
import QrcodeVue from "qrcode.vue";

defineComponent({
  QrcodeVue,
});

const store = usePiniaStore();
const config = useRuntimeConfig();

const datzan = ref("");
const value = ref("");
const qrCode = ref(false);
const size = ref(300);

const fetchDatzan = async () => {
  try {
    let response = await $fetch(
      `${config.public.url}/items/datzans/${useRoute().params.id}`
    );

    datzan.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const generateQrCode = () => {
  value.value = `${config.public.my_domain}/datsan/${useRoute().params.id}`;
};
const showQrCode = () => (qrCode.value = !qrCode.value);
onMounted(() => {
  fetchDatzan();
  generateQrCode();
});
</script>
<style>
.qr-code-wrapper {
  background: rgba(0, 0, 0, 0.6);
}
</style>