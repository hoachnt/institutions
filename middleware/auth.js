export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useDirectusUser();

  if (!user.value) {
    alert("authentication timed out")
    
    return navigateTo("/login");
  }
});
