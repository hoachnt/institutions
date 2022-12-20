<template>
  <main class="container w-2/4 min-w-full sm:min-w-0 m-0 sm:m-auto px-3">
    <div class="text-sm breadcrumbs mb-4">
      <ul>
        <li>
          <v-chip rounded="pill" size="large">
            <a @click="$router.push('/')">Home</a>
          </v-chip>
        </li>
        <li>
          <v-chip rounded="pill" size="large">
            <a>{{ location.name }}</a>
          </v-chip>
        </li>
      </ul>
    </div>
    <div>
      <transition name="fade">
        <div
          class="
            datsan
            mx-1
            rounded-xl
            shadow-md
            bg-neutral
            my-2
            min-w-screen
            relative
            md:w-auto
          "
        >
          <div>
            <img
              class="rounded-xl min-w-full"
              :src="`https://directus.hoach.skryonline.com/assets/${location.img}`"
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
                  text-content
                "
              >
                {{ location.name }}
              </h5>
            </div>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{ location.description }}
            </p>
            <p class="mb-3 font-normal text-gray-400">
              {{ location.address }}
            </p>
            <div class="flex justify-between items-center">
              <UIButton
                @click="
                  $router.push({
                    name: 'events',
                    query: { location: location.id },
                  })
                "
              >
                {{ $t("schedules") }}
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
              </UIButton>
              <UIButton @click="showQrCode" rounded="lg">
                <font-awesome-icon
                  :icon="['fa', 'fa-qrcode']"
                  class="text-xl text-content"
                  v-if="store.loading"
                />
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
      </transition>
    </div>
  </main>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
import QrcodeVue from "qrcode.vue";

defineComponent({
  QrcodeVue,
});

const store = usePiniaStore();
const config = useRuntimeConfig();

const location = ref("");
const value = ref("");
const qrCode = ref(false);
const size = ref(300);

const fetchDatzan = async () => {
  try {
    let response = await $fetch(
      `${config.public.url}/items/location/${useRoute().params.id}`
    );

    location.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
const generateQrCode = () => {
  value.value = `${config.public.my_domain}${useRoute().path}`;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>