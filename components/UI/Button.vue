<template>
  <button
    type="submit"
    class="
      btn btn-primary
      text-content
      active:bg-secondary
      hover:bg-primary
      normal-case
      text-base
      font-medium
      px-6
      py-3
      rounded-3xl
      hover:rounded-lg
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