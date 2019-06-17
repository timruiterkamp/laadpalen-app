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
    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.$store.getters.GET_TOKEN
      },
      body: JSON.stringify({
        query: 'query { issues { location status image confirmed }}'
      })
    })
      .then(res => res.json())
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }
}
</script>


<style lang="scss" scoped>
</style>

