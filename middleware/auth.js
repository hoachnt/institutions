export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useDirectusUser();

  if (!user.value || user.value == undefined) {
    console.log(user.value);
    return navigateTo("/login");
  }
});
