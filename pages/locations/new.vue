<template>
  <main>
    <div class="m-auto">
      <div class="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <v-chip rounded="pill" size="large">
              <a @click="$router.push('/')">Home</a>
            </v-chip>
          </li>
          <li>
            <v-chip rounded="pill" size="large">
              <a>New</a>
            </v-chip>
          </li>
        </ul>
      </div>
      <ClientOnly>
        <template #default>
          <transition name="fade">
            <form @submit.prevent>
              <h1 class="text-5xl font-normal mb-6">
                {{ $t("createANewInstitution") }}
              </h1>
              <select
                id="countries"
                class="
                  rounded-md
                  block
                  w-full
                  p-2.5
                  bg-base-100
                  my-1
                  border border-primary
                  placeholder-base-100
                  text-primary
                  focus:ring-primary focus:border-primary
                "
                v-model="location.type"
                required
              >
                <option disabled value="">{{ $t("selectType") }}</option>
                <option value="Church">{{ $t("church") }}</option>
                <option value="Temple">{{ $t("temple") }}</option>
                <option value="Mosque">{{ $t("mosque") }}</option>
              </select>
              <UIInput
                :placeholder="$t('name')"
                v-model:value="location.name"
                required
              />
              <UIInput
                :placeholder="$t('address')"
                v-model:value="location.address"
                required
              />
              <UIInput
                type="file"
                id="file"
                class="
                  block
                  w-full
                  py-1
                  text-sm text-content
                  file:mr-4
                  file:py-2
                  file:px-4
                  file:rounded-full
                  file:border-0
                  file:text-sm
                  file:font-semibold
                  file:bg-black
                  file:text-white
                  hover:file:bg-white hover:file:text-secondary
                  cursor-pointer
                "
              />
              <div class="mt-4">
                <label
                  for="message"
                  class="text-3xl font-normal tracking-tight text-content"
                  >{{ $t("description") }}</label
                >
                <v-textarea
                  label="Write your description here"
                  v-model="location.description"
                  placeholder="Type..."
                  rows="8"
                  class="mt-2"
                ></v-textarea>
              </div>
              <UIButton
                @click="createDatzan"
                class="min-w-full"
                :disabled="isDisabled"
                v-if="!isDisabled"
              >
                Create {{ location.type }}
              </UIButton>
              <UILoadingButton v-else />
            </form>
          </transition>
        </template>
      </ClientOnly>
      <v-snackbar v-model="snackbar" :timeout="2500" color="white">
        {{ $t("maxLocations") }}
      </v-snackbar>
    </div>
  </main>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const token = useDirectusToken();
const { getItems } = useDirectusItems();
const store = usePiniaStore();
const snackbar = ref(false);
const LIMIT_IMAGES = store.LIMIT_IMAGES;
const isDisabled = ref(false);

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Create Institution",
});

const location = reactive({
  name: "",
  address: "",
  description: "",
  img: "",
  type: "",
});
const locations = ref([]);
const MAXLOCATIONS = 10;

const fetchInstitution = async () => {
  try {
    const filter = { user_created: `${store.user.id}` };
    locations.value = await getItems({
      collection: "location",
      params: {
        filter: filter,
      },
    });
  } catch (e) {
    alert(e);
  }
};
const showSnackbar = () => (snackbar.value = true);
const response = async () => {
  await fetchInstitution();

  if (locations.value.length >= MAXLOCATIONS) {
    isDisabled.value = false;

    showSnackbar();
  } else {
    await $fetch(`${store.url}/files?sort=uploaded_on`, {
      params: {
        limit: LIMIT_IMAGES,
        page: store.LAST_PAGE,
      },
    })
      .then((response) => {
        let responseData = response.data;

        if (!!file.files[0]) {
          location.img = responseData[responseData.length - 1].id;
        } else {
          location.img = null;
        }

        return $fetch(`${store.url}/items/location`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          body: location,
        });
      })
      .then((response) => {
        useRouter().push({
          name: "events-new",
          query: { location: response.data.id, message: "create_institution" },
        });
      });
  }
};

const createDatzan = async () => {
  try {
    if (
      location.name !== "" &&
      location.address !== "" &&
      location.type !== ""
    ) {
      isDisabled.value = true;

      pushHotelImage();

      await response();
    }
  } catch (error) {
    console.log(error);
  }
};
async function pushHotelImage() {
  const file = document.getElementById("file");

  const formData = new FormData();

  formData.append("title", "Image");
  formData.append("file", file.files[0]);

  await $fetch(`${store.url}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: formData,
  });
}

onMounted(() => {
  store.fetchTotalImages();
});
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
