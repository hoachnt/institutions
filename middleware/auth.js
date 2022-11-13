import { usePiniaStore } from "~~/stores/PiniaStore";

export default defineNuxtRouteMiddleware((to, _from) => {
  const store = usePiniaStore();

  if (!store.authenticated) {
    return navigateTo("/register");
  } else if(to.path == "/register" || to.path == "/login") {
    return navigateTo("/")
  }
});
