<template>
  <div class="c-notifications">
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
        :showStakeholder="false"
      />
    </div>
  </div>
</template>

<script>
import Ticket from '~/components/shared/Ticket.vue'
import SmallHeader from '~/components/client/SmallHeader.vue'
import DB from '~/helpers/db'

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
    this.$store.commit('RESET_MESSAGES_NOTIFICATIONS')

    DB.execute(
      'query { issues { title location createdAt stakeholders { title } status }}',
      this.$store.getters.GET_TOKEN
    ).then(res => {
      console.log(res)
      return (this.allIssues = res.issues)
    })
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
.c-notifications {
  padding-bottom: $padding-xl * 2;
}
</style>
