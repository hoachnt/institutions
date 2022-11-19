export const usePiniaStore = defineStore("PiniaStore", () => {
  const user = useDirectusUser();
  const { logout } = useDirectusAuth();

  const router = useRouter();

  const logOut = async () => {
    await logout();

    await router.push("/login");

    await document.location.reload(true);
  };

  if (user.value) {
    const authenticated = ref(false);
    const config = useRuntimeConfig();
    const url = config.public.url;
    const datzans = ref([]);
    const userCreated = ref(user.value.id);
    const token = useDirectusToken();
    const schedules = ref([]);

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
        alert(error);

        logOut();
      }
    };
    const removeDatzan = async (id) => {
      try {
        datzans.value = datzans.value.filter((items) => items.id != id);

        let response = await $fetch(`${url}/items/datzans/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
      } catch (error) {}
    };
    const removeEvent = async (id) => {
      try {
        schedules.value = schedules.value.filter((items) => items.id != id);

        let response = await $fetch(`${url}/items/events/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
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
      removeEvent,
    };
  }
});
