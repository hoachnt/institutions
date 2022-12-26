export const usePiniaStore = defineStore("PiniaStore", () => {
  const user = useDirectusUser();
  const { logout } = useDirectusAuth();
  const router = useRouter();
  const loading = ref(false);
  const toastVisible = ref(false);
  const message = ref("");
  const schedules = ref([]);
  const config = useRuntimeConfig();
  const url = config.public.url;
  const dialog = ref(false);
  const loadingEvent = ref(false);

  const nuxtApp = useNuxtApp();
  nuxtApp.hook("page:finish", () => {
    loading.value = true;
  });

  function showToast() {
    let timer = setTimeout(function tick() {
      toastVisible.value = true;

      timer = setTimeout(tick, 2000); // (*)
    }, 0);

    setTimeout(() => {
      clearTimeout(timer);

      toastVisible.value = false;
    }, 4000);
  }
  const fetchSchedule = async () => {
    try {
      let response = await $fetch(
        `${url}/items/events?filter={"location_id":"${
          useRoute().query.location
        }"}`
      );

      schedules.value = await response.data;
    } catch (error) {
      alert(error);
    }
  };

  if (user.value) {
    const authenticated = ref(false);
    const locations = ref([]);
    const userCreated = ref(user.value.id);
    const token = useDirectusToken();
    const email = ref("");
    const userEmail = ref(user.value.email);
    const removeMessage = ref("This action cannot be undone");
    const removeDatzanError = ref(false);
    const scheduleTitleId = ref("");
    const totalIamges = ref();
    const LAST_PAGE = ref();
    const LIMIT_IMAGES = 100;
    const { getItemById } = useDirectusItems();
    const event = ref([]);

    const fetchEvent = async (eventId) => {
      try {
        event.value = await getItemById({
          collection: "events",
          id: eventId,
        });
      } catch (e) {
        alert(e.name);
      }
    };
    const removeEvent = async (eventId) => {
      try {
        let response = await $fetch(`${url}/items/events/${eventId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });

        loadingEvent.value = true;

        await fetchSchedule();

        loadingEvent.value = false;
      } catch (error) {
        alert(error.message);
      } finally {
        dialog.value = false;
      }
    };
    const updateEvent = async (eventId) => {
      try {
        let response = await $fetch(`${url}/items/events/${eventId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          body: event.value,
        });

        await fetchSchedule();
      } catch (error) {
        alert(error.name);
      } finally {
        dialog.value = false;
      }
    };
    const logOut = async () => {
      await logout();

      await router.push({ name: "login", query: { message: "logout" } });
    };
    const removeDatzan = async (id) => {
      try {
        if (email.value === userEmail.value) {
          locations.value = locations.value.filter((items) => items.id != id);

          let response = await $fetch(`${url}/items/location/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          });

          removeMessage.value = "Location was deleted";

          removeTimer();
        } else {
          removeMessage.value = "Wrong email";

          removeTimer();
        }
      } catch (error) {}
    };
    function removeTimer() {
      let timer = setTimeout(function tick() {
        removeDatzanError.value = true;

        timer = setTimeout(tick, 2000); // (*)
      }, 0);

      setTimeout(() => {
        clearTimeout(timer);

        removeDatzanError.value = false;
      }, 4000);
    }
    const fetchTotalImages = async () => {
      totalIamges.value = await $fetch(`${url}/files?meta=total_count`);

      LAST_PAGE.value = await Math.ceil(
        totalIamges.value.meta.total_count / LIMIT_IMAGES
      );

      return LAST_PAGE.value;
    };

    return {
      authenticated,
      userCreated,
      token,
      locations,
      url,
      removeDatzan,
      schedules,
      email,
      removeMessage,
      removeDatzanError,
      scheduleTitleId,
      user,
      loading,
      LAST_PAGE,
      LIMIT_IMAGES,
      fetchTotalImages,
      logOut,
      showToast,
      message: skipHydrate(message),
      toastVisible: skipHydrate(toastVisible),
      fetchSchedule,
      fetchEvent,
      event,
      removeEvent,
      dialog,
      updateEvent,
      loading,
      loadingEvent,
    };
  }
  return {
    loading: skipHydrate(loading),
    message: skipHydrate(message),
    showToast,
    toastVisible: skipHydrate(toastVisible),
    fetchSchedule,
    schedules,
    dialog,
    loadingEvent,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot));
}
