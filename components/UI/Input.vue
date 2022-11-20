<template lang="">
  <input type="text" :value="value" @input="emitUpdateInput" class="px-3 py-3 placeholder-slate-300 bg-neutral relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full mb-1 mt-1">
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