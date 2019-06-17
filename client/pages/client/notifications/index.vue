<template>
  <div>
    <!-- <TicketList :list="workingList" group="tickets" status="working" @change="update"/> -->
    {{ data }} -->
  </div>
</template>

<script>
import axios from 'axios'
import TicketList from '~/components/dashboard/TicketList.vue'

export default {
  layout: 'client',
  components: {
    TicketList
  },
  data() {
    return {
      data: []
    }
  },
  mounted() {
    console.log(this.$store.getters.GET_TOKEN)
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
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }
}
</script>


<style lang="scss" scoped>
</style>

