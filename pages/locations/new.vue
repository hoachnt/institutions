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
              <h1 class="text-4xl mb-2">{{ $t("createANewInstitution") }}</h1>
              <select
                id="countries"
                class="
                  border border-gray-300
                  text-sm
                  rounded-md
                  focus:ring-primary focus:border-primary
                  block
                  w-full
                  p-2.5
                  bg-base-100
                  my-1
                  dark:border-gray-600 dark:placeholder-base-100
                  text-white
                  dark:focus:ring-primary dark:focus:border-primary
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
              />
              <label
                for="message"
                class="block mb-1 mt-3 text-lg font-medium text-white"
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
                @click="createDatzan"
                class="min-w-full text-white"
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
          name: "events",
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
