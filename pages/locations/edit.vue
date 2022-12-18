<template>
  <main>
    <div class="container m-auto px-4">
      <div class="text-sm breadcrumbs mb-4">
        <ul>
          <li><a @click="$router.push('/')">Home</a></li>
          <li><a>New</a></li>
        </ul>
      </div>
      <ClientOnly>
        <template #default>
          <transition name="fade">
            <form @submit.prevent>
              <h1 class="text-4xl mb-2">{{ $t("editHeader") }}</h1>
              <select
                id="countries"
                class="
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-md
                  focus:ring-primary focus:border-primary
                  block
                  w-full
                  p-2.5
                  bg-base-100
                  my-1
                  dark:border-gray-600
                  dark:placeholder-base-100
                  dark:text-white
                  dark:focus:ring-primary
                  dark:focus:border-primary
                "
                v-model="location.type"
              >
                <option disabled value="">{{ $t("selectType") }}</option>
                <option value="Church">{{ $t("church") }}</option>
                <option value="Temple">{{ $t("temple") }}</option>
                <option value="Mosque">{{ $t("mosque") }}</option>
              </select>
              <UIInput placeholder="Name" v-model:value="location.name" />
              <UIInput placeholder="Address" v-model:value="location.address" />
              <UIInput
                type="file"
                id="file"
                class="
                  block
                  w-full
                  py-1
                  text-sm text-slate-500
                  file:mr-4
                  file:py-2
                  file:px-4
                  file:rounded-full
                  file:border-0
                  file:text-sm
                  file:font-semibold
                  file:bg-violet-50
                  file:text-secondary
                  hover:file:bg-secondary hover:file:text-white
                  cursor-pointer
                "
                accept=".jpg, .jpeg, .png, .webp"
                v-model="location.img"
              />
              <div class="wrapper py-1 max-w-4xl m-auto">
                <img
                  alt=""
                  :src="`https://directus.hoach.skryonline.com/assets/${location.img}`"
                  class="rounded-xl img min-w-full"
                />
              </div>
              <label
                for="message"
                class="
                  block
                  mb-1
                  mt-3
                  text-2xl
                  font-medium
                  text-gray-900
                  dark:text-white
                "
                >{{ $t("description") }}</label
              >
              <v-textarea
                label="Write your description here"
                variant="outlined"
                v-model="location.description"
                placeholder="Type..."
                rows="8"
              ></v-textarea>
              <UIButton
                block
                @click="updateLocation"
                :disabled="isDisabled"
                v-if="!isDisabled"
                class="min-w-full text-white"
              >
                {{ $t("edit") }} {{ location.name }}
              </UIButton>
              <UILoadingButton v-else />
            </form>
          </transition>
        </template>
      </ClientOnly>
      <!-- <v-snackbar v-model="snackbar" :timeout="2500" color="white">
        {{ $t("maxLocations") }}
      </v-snackbar> -->
    </div>
  </main>
</template>
<script setup lang="ts">
import { usePiniaStore } from "@/stores/PiniaStore";

const { getItemById } = useDirectusItems();
const store = usePiniaStore();
const token = useDirectusToken();
const location: any = ref([]);
const totalIamges = ref();
const LAST_PAGE = ref();
const LIMIT_IMAGES = 100;
const { messageFunction } = messageLogin();
const isDisabled = ref(false);

const fetchInstitution = async () => {
  try {
    location.value = await getItemById({
      collection: "location",
      id: useRoute().query.location,
    });
  } catch (e) {}
};
const fetchTotalImages = async () => {
  totalIamges.value = await $fetch(`${store.url}/files?meta=total_count`);

  LAST_PAGE.value = await Math.ceil(
    totalIamges.value.meta.total_count / LIMIT_IMAGES
  );
};
const updateLocation = async () => {
  isDisabled.value = true;

  const file: any = document.getElementById("file");

  if (!!file.files[0]) {
    await pushHotelImage();

    let getImg = await $fetch(`${store.url}/files?sort=uploaded_on`, {
      params: {
        limit: LIMIT_IMAGES,
        page: LAST_PAGE.value,
      },
    });

    let responseData = getImg.data;

    location.value.img = responseData[responseData.length - 1].id;
  }

  let response = await $fetch(
    `${store.url}/items/location/${location.value.id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: location.value,
    }
  );
  await useRouter().push({ name: "index", query: { message: "edit" } });
};
async function pushHotelImage() {
  const file: any = document.getElementById("file");
  const formData = new FormData();

  await formData.append("title", "Image");
  await formData.append("file", file.files[0]);

  await $fetch(`${store.url}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: formData,
  });
}

onMounted(() => {
  fetchInstitution();
  fetchTotalImages();
  messageFunction();
});
</script>
<style lang=""></style>
