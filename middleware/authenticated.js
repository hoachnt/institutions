export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useDirectusUser();
  
  if (!user.value) return
  if (to.path == "/register" || to.path == "/login") return navigateTo("/");
});
