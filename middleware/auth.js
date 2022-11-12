import { usePiniaStore } from "~~/stores/PiniaStore";

export default defineNuxtRouteMiddleware((to, _from) => {
  const store = usePiniaStore()

  if (!store.authenticated) {
    return navigateTo("/login");
  }
});
