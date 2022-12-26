<template>
  <button
    type="submit"
    class="
      btn
      text-white
      hover:shadow-xl
      hover:rounded-lg
      uppercase
      text-sm
      px-6
      py-3
      rounded-3xl
      mt-1
      mb-1
      ease-linear
      transition-all
      duration-150
      select-none
    "
  >
    <slot></slot>
  </button>
</template>
<script>
export default {};
</script>
<style scoped>
button {
  cursor: pointer;
  background: #855300;
}
button:hover {
  background: #855300;
}
</style>