export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useDirectusUser();
  
  if (user.value) {
    if (to.path == "/register" || to.path == "/login") {
      return navigateTo("/");
    }
  }
});
