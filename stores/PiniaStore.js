export const usePiniaStore = defineStore("PiniaStore", () => {
  const authenticated = ref(false);
  const config = useRuntimeConfig();
  const url = config.public.url;
  const datzans = ref([]);
  const user = useDirectusUser();
  const userCreated = ref(user.value.id);
  const token = useDirectusToken();

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

      useRouter().push("/");
    }
  };
  const removeDatzan = async (id) => {
    try {      
      datzans.value = datzans.value.filter(items => items.id != id)

      let response = await $fetch(`${url}/items/datzans/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
    } catch (error) {}
  };
  onMounted(() => {
    fetchDatzan();
  });

  return {
    authenticated,
    userCreated,
    token,
    fetchDatzan,
    datzans,
    url,
    removeDatzan,
  };
});
