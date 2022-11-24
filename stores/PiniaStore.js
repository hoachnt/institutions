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
    const datzans = ref([]);
    const userCreated = ref(user.value.id);
    const token = useDirectusToken();
    const schedules = ref([]);
    const email = ref("");
    const userEmail = ref(user.value.email);
    const removeMessage = ref("This action cannot be undone");
    const removeDatzanError = ref(false);
    const scheduleTitleId = ref("");

    const fetchDatzan = async () => {
      try {
        let response = await $fetch(
          `${url}/items/datzans?filter={"user_created":"${userCreated.value}"}`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        datzans.value = response.data;
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
          datzans.value = datzans.value.filter((items) => items.id != id);

          let response = await $fetch(`${url}/items/datzans/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          });
        } else {
          removeMessage.value = "Wrong email";

          let timer = setTimeout(function tick() {
            removeDatzanError.value = true;

            timer = setTimeout(tick, 2000); // (*)
          }, 0);

          setTimeout(() => {
            clearTimeout(timer);

            removeDatzanError.value = false;
          }, 4000);
        }
      } catch (error) {}
    };

    return {
      authenticated,
      userCreated,
      token,
      fetchDatzan,
      datzans,
      url,
      removeDatzan,
      schedules,
      email,
      removeMessage,
      removeDatzanError,
      scheduleTitleId,
      user,
      loading,
    };
  }
  return {
    loading,
  };
});
