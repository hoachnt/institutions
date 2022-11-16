export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useDirectusUser();

  if (!user.value) {
    try {
      return navigateTo("/login");
    } catch (error) {
      return navigateTo("/login")
    }
  }
});
