export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useDirectusUser();
  
  if (!user.value || user.value == undefined) {
    return navigateTo("/login");
  } 
  navigateTo(to.path)
});
