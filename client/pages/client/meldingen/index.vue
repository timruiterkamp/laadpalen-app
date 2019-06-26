<template>
  <div class="c-notifications">
    <SmallHeader title="Meldingen"/>

    <div class="ticketList">
      <div v-if="allIssues < 0" class="ticketList__error">Er zijn geen meldingen of je bent offline</div>
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
import socketIOClient from 'socket.io-client'

export default {
  layout: 'client',
  components: {
    Ticket,
    SmallHeader
  },
  data() {
    return {
      allIssues: [],
      endpoint:
        process.env.NODE_ENV == 'development'
          ? process.env.DEV_URL
          : process.env.PROD_URL
    }
  },
  mounted() {
    const socket = socketIOClient(this.endpoint)
    this.$store.commit('RESET_MESSAGES_NOTIFICATIONS')
    this.getData()

    socket.on('issue has been created', data => {
      this.getData()
    })

    socket.on('issue status has been updated', data => {
      this.getData()
    })
  },
  methods: {
    getData() {
      DB.execute(
        'query { issues { title location createdAt stakeholders { title } status }}',
        this.$store.getters.GET_TOKEN
      )
        .then(res => res.issues)
        .then(res =>
          res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        )
        .then(res => (this.allIssues = res))
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.ticketList {
  margin: $padding-xl auto;
  padding: 0 $padding-s;
  max-width: 40rem;
  &__error {
    text-align: center;
    margin: $margin-l 0;
    font-weight: bold;
  }
}
.c-notifications {
  padding-bottom: $padding-xl * 2;
}
</style>
