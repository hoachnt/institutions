<template>
  <main>
    <div class="container m-auto px-4">
      <transition name="fade">
        <form @submit.prevent class="">
          <h1 class="text-4xl mb-2">Create a new location</h1>
          <UIInput placeholder="Location name" v-model:value="datzan.name" />
          <UIInput
            placeholder="Location address"
            v-model:value="datzan.address"
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
              file:text-sky-600
              hover:file:bg-blue-600 hover:file:text-white
              cursor-pointer
            "
            v-model:value="datzan.img"
          />
          <label
            for="message"
            class="
              block
              mb-1
              mt-3
              text-lg
              font-medium
              text-gray-900
              dark:text-white
            "
            >Description</label
          >
          <textarea
            v-model="datzan.description"
            id="message"
            rows="4"
            class="
              block
              p-2.5
              w-full
              text-sm
              bg-neutral
              rounded-lg
              placeholder-gray-400
              text-white
              focus:ring-indigo-500 focus:border-indigo-500
              my-1
            "
            placeholder="Write your description here..."
          ></textarea>
          <button
            @click="createDatzan"
            class="
              min-w-full
              bg-indigo-500
              text-white
              border border-indigo-500
              hover:bg-indigo-500 hover:text-white
              active:bg-indigo-600
              font-bold
              uppercase
              text-sm
              px-6
              py-3
              rounded
              outline-none
              focus:outline-none
              mt-1
              mb-1
              ease-linear
              transition-all
              duration-150
            "
          >
            Create Datzan
          </button>
        </form>
      </transition>
    </div>
  </main>
</template>
<script setup>
import { usePiniaStore } from "@/stores/PiniaStore";
const token = useDirectusToken();

const store = usePiniaStore();

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: "Datzan",
});

const datzan = {
  name: "",
  address: "",
  description: "",
  img: "",
};

onMounted(() => {
  store.fetchDatzan();
});

const createDatzan = () => {
  try {
    pushHotelImage();

    const response = $fetch(`${store.url}/files?sort=uploaded_on`)
      .then((response) => {
        let responseData = response.data;

        datzan.img = responseData[responseData.length - 1].id;

        return $fetch(`${store.url}/items/datzans`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          body: datzan,
        });
      })
      .then((response) => {
        store.fetchDatzan();

        useRouter().push({ name: "events", query: { location: response.data.id } });
      });
  } catch (error) {
    console.log(error);
  }
};
function pushHotelImage() {
  const file = document.getElementById("file");

  const formData = new FormData();
  console.log(file);

  formData.append("title", "Image");
  formData.append("file", file.files[0]);

  return $fetch(`${store.url}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: formData,
  });
}
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