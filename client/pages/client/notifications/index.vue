<template>
  <div>
    <SmallHeader title="Meldingen"/>
    <div class="ticketList">
      <Ticket
        v-for="(item, i) in allIssues"
        :key="`item-${i}`"
        :title="item.title"
        :location="item.location"
        :created="item.createdAt"
        :stakeholder="item.stakeholders.title"
        :status="item.status"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Ticket from '~/components/shared/Ticket.vue'
import SmallHeader from '~/components/client/SmallHeader.vue'

export default {
  layout: 'client',
  components: {
    Ticket,
    SmallHeader
  },
  data() {
    return {
      allIssues: []
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
        query:
          'query { issues { title location createdAt stakeholders { title } status }}'
      })
    })
      .then(res => res.json())
      .then(res => (this.allIssues = res.data.issues))
      .catch(err => console.log(err))
  }
}
</script>


<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.ticketList {
  margin: $padding-xl auto;
  padding: 0 $padding-s;
  max-width: 40rem;
}
</style>

