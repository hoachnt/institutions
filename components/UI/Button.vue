<template>
  <button
    type="submit"
    class="
      btn
      text-content
      border border-primary
      hover:bg-primary hover:text-white
      active:bg-secondary
      font-bold
      uppercase
      text-sm
      px-6
      py-3
      rounded-xl
      btn-outline
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