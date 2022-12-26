<template>
  <button
    type="submit"
    class="
      ml-2
      focus:outline-none
      text-white
      bg-red-500
      hover:bg-red-800
      focus:ring-4 focus:ring-red-300
      hover:rounded-lg
      rounded-3xl
      font-semibold
      uppercase
      text-sm
      px-5
      py-2.5
      my-1
      ease-linear
      transition-all
      duration-150
    "
  >
    <slot></slot>
  </button>
</template>
<script>
export default {};
</script>
<style>
button {
  cursor: pointer;
}
</style>