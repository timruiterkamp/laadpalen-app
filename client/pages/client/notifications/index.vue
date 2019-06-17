<template>
  <div>
    <h1></h1>
    {{data}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'client',
  data() {
    return {
      data: []
    }
  },
  mounted() {
    console.log(this.$store.state.authToken)
  }
}
</script>


<style lang="scss" scoped>
</style>

