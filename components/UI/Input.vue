<template lang="">
  <input type="text" :value="value" @input="emitUpdateInput">
</template>
<script>
export default {
  props: {
    value: [Number, String]
  },
  methods: {
    emitUpdateInput(event) {
      this.$emit("update:value", event.target.value)
    }
  }
}
</script>
<style lang="">
</style>