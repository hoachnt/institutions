<template lang="">
  <input
    type="text"
    :value="value"
    @input="emitUpdateInput"
    class="input w-full border my-1 placeholder:text-content rounded-lg ease-linear transition-all duration-150"
  />
</template>
<script>
export default {
  props: {
    value: [Number, String, Object, Array],
  },
  methods: {
    emitUpdateInput(event) {
      this.$emit("update:value", event.target.value);
    },
  },
};
</script>
<style lang=""></style>
