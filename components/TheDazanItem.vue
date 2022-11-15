<template lang="">
  <div>
    <div>{{datzan.title}}</div>
    <div>{{datzan.address}}</div>
    <UIButton @click="$router.push(`/schedule/${this.datzan.id}`)">Schedule</UIButton>
  </div>
</template>
<script>
export default {
  props: {
    datzan: {
      type: Object
    }
  },
}
</script>
<style lang="">
</style>