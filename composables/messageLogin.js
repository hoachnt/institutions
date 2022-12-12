import { usePiniaStore } from "@/stores/PiniaStore";

export default function messageLogin() {
  const store = usePiniaStore();
  const message = ref("");

  const messageFunction = () => {
    if (useRoute().query.message !== "login") return;
    store.showToast();

    message.value = "You are logged in";

    console.log(message.value);
  };

  return {
    message,
    messageFunction,
  };
}
