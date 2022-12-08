<template lang="">
  <input
    type="text"
    :value="value"
    @input="emitUpdateInput"
    class="input w-full bg-neutral my-1 rounded-lg ease-linear transition-all duration-150"
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
      console.log(event.target.value)
    },
  },
  mounted() {
    console.log(this.value)
  }
};
</script>
<style lang=""></style>
