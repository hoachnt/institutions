<template>
  <div>
    <UIButton @click="$router.push('/')">Home</UIButton>
    <UIButton @click="$router.push('/register')" v-if="!token"
      >Register</UIButton
    >
    <UIButton @click="$router.push('/login')" v-if="!token">Login</UIButton>
    <UIButton @click="logOut" v-if="token">Logout</UIButton>
  </div>
</template>
<script setup>
const { logout } = useDirectusAuth();

const token = useDirectusToken();
const router = useRouter();

const logOut = async () => {
  logout();

  router.push('login')
};
</script>
<style lang="">
</style>