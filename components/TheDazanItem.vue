<template lang="">
  <div>
    <div>{{dazan.title}}</div>
    <div>{{dazan.address}}</div>
    <UIButton @click="$router.push(`/schedule/${this.dazan.id}`)">Schedule</UIButton>
  </div>
</template>
<script>
export default {
  props: {
    dazan: {
      type: Object
    }
  },
}
</script>
<style lang="">
</style>