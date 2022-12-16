export default function messageLogin() {
  const store = usePiniaStore();

  const messageFunction = () => {
    if (useRoute().query.message !== "login") return;
    store.showToast();

    store.message = "You are logged in";

    console.log(store.message);
  };

  return {
    messageFunction,
  };
}
