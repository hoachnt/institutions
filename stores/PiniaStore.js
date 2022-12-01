export const usePiniaStore = defineStore("PiniaStore", () => {
  const user = useDirectusUser();
  const { logout } = useDirectusAuth();

  const router = useRouter();

  const logOut = async () => {
    await logout();

    await router.push("/login");

    await document.location.reload(true);
  };

  const loading = ref(false);

  const nuxtApp = useNuxtApp();
  nuxtApp.hook("page:finish", () => {
    loading.value = true;
  });

  if (user.value) {
    const authenticated = ref(false);
    const config = useRuntimeConfig();
    const url = config.public.url;
    const locations = ref([]);
    const userCreated = ref(user.value.id);
    const token = useDirectusToken();
    const schedules = ref([]);
    const email = ref("");
    const userEmail = ref(user.value.email);
    const removeMessage = ref("This action cannot be undone");
    const removeDatzanError = ref(false);
    const toastVisible = ref(false);
    const scheduleTitleId = ref("");

    const fetchDatzan = async () => {
      try {
        let response = await $fetch(
          `${url}/items/location?filter={"user_created":"${userCreated.value}"}`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        locations.value = response.data;
      } catch (error) {
        if (error.status == 401) {
          alert("You are not authorized or authorization timed out");
        }
        alert(error);
      }
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

    onMounted(() => {
      fetchDatzan();
    });

    return {
      authenticated,
      userCreated,
      token,
      fetchDatzan,
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
      logOut,
      toastVisible,
      showToast,
    };
  }
  return {
    loading,
  };
});
