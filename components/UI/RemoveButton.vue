<template>
  <button
    type="submit"
    class="
      ml-2
      focus:outline-none
      text-white
      bg-red-700
      hover:bg-red-800
      focus:ring-4 focus:ring-red-300
      rounded-md
      font-bold
      uppercase
      text-sm
      px-5
      py-2.5
      my-1
      dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900
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