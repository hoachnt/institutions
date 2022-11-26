<template>
  <button
    type="submit"
    class="
      text-indigo-500
      border border-indigo-500
      hover:bg-indigo-500 hover:text-white
      active:bg-indigo-600
      font-bold
      uppercase
      text-sm
      px-6
      py-3
      rounded-lg
      outline-none
      focus:outline-none
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
<style>
button {
  cursor: pointer;
}
</style>