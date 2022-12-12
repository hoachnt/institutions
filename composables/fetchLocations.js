import { usePiniaStore } from "@/stores/PiniaStore";

export default async function fetchLocations(url) {
  const store = usePiniaStore();
  const token = useDirectusToken();
  const locations = ref([]);

  const fetching = async () => {
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
      store.locations = locations.value;
    } catch (error) {
      if (error.status == 401) {
        alert("You are not authorized or authorization timed out");

        await store.logOut();
      }
    }
  };

  onMounted(fetching);

  return {
    locations,
    token,
  };
}
