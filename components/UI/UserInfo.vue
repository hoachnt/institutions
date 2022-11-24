<template lang="">
  <li v-if="token">
    <a class="rounded-lg px-0">
      <div class="avatar online placeholder">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-16">
          <span class="text-xl">{{ user.first_name }}</span>
        </div>
      </div>
      <div class="offer">
        <span> {{ user.first_name }} {{ user.last_name }} </span>
        <p class="text-gray-500">
          {{ user.email }}
        </p>
      </div>
    </a>
  </li>
</template>
<script setup>
let user = {
  first_name: '',
  last_name: '',
  email: ''
};

if (useRoute().path != "/register" || useRoute().path != "/login") {
  user = useDirectusUser();
}
const token = useDirectusToken();
</script>
<style lang=""></style>
