export default function messageLogin() {
  const store = usePiniaStore();
  const queryMessage = useRoute().query.message
  const { showToast } = store

  const messageFunction = () => {
    if (queryMessage == "login") {
      showToast();
      store.message = "You are logged in";

      return
    }
    if (queryMessage == "register") {
      showToast();
      store.message = "You are registered with the institution";

      return
    }
    if (queryMessage == "logout") {
      showToast();
      store.message = "You are logged out";

      return
    }
    if (queryMessage == "edit") {
      showToast();
      store.message = "Institution was edited";

      return
    }
    if (queryMessage == "create_institution") {
      showToast();
      store.message = "Institution was created";

      return
    }
    if (queryMessage == "create_schedule") {
      showToast();
      store.message = "Schedule was created";

      return
    }
    if (queryMessage == "create_event") {
      showToast();
      store.message = "Event was created";

      return
    }
  };

  return {
    messageFunction,
  };
}
