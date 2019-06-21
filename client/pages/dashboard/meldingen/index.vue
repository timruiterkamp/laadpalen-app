<template>
  <div class="d-container">
    <h2>Meldingen</h2>
    <TicketFilter :list="data" v-on:filtered="filter" />
    <div class="d-tickets">
      <div class="d-tickets__column">
        <h3 class="d-tickets__column-title">Open</h3>
        <hr class="d-hr">
        <TicketList :list="openList" group="tickets" status="open" @change="update"/>
      </div>
      <div class="d-tickets__column">
        <h3 class="d-tickets__column-title">Working</h3>
        <hr class="d-hr">
        <TicketList :list="workingList" group="tickets" status="working" @change="update"/>
      </div>
      <div class="d-tickets__column">
        <h3 class="d-tickets__column-title">Closed</h3>
        <hr class="d-hr">
        <TicketList :list="closedList" group="tickets" status="closed" @change="update"/>
      </div>
    </div>
  </div>
</template>
<script>
import TicketList from '~/components/dashboard/TicketList.vue'
import TicketFilter from '~/components/dashboard/TicketFilter.vue'
import socketIOClient from 'socket.io-client'
import DB from '~/helpers/db'

export default {
  layout: 'dashboard',
  components: {
    TicketList,
    TicketFilter
  },
  data() {
    return {
      endpoint: 'localhost:3001',
      list: [],
      data: []
    }
  },
  mounted() {
    this.getTickets()
      .then(res => {
        this.list = res
        this.data = res
      })
      .catch(console.error)
  },
  computed: {
    openList() {
      return this.list
        .filter(ticket => ticket.status === 'open')
        .sort(
          (ticketA, ticketB) =>
            new Date(ticketB.created) - new Date(ticketA.created)
        )
    },
    workingList() {
      return this.list
        .filter(ticket => ticket.status === 'working')
        .sort(
          (ticketA, ticketB) =>
            new Date(ticketB.created) - new Date(ticketA.created)
        )
    },
    closedList() {
      return this.list
        .filter(ticket => ticket.status === 'closed')
        .sort(
          (ticketA, ticketB) =>
            new Date(ticketB.created) - new Date(ticketA.created)
        )
    },
    stakeholder() {
      return this.$store.getters.GET_STAKEHOLDER
    }
  },
  methods: {
    filter(newList) {
      this.list = newList
    },
    sendIssueUpdatedMessage(title) {
      const socket = socketIOClient(this.endpoint)
      socket.emit('issue has been updated', title) // change 'red' to this.state.color
    },
    update(updated) {
      const index = this.list.findIndex(ticket => ticket._id == updated._id)
      if (index > -1) {
        this.list[index].status = updated.status
      }
      DB.execute(`mutation {
        updateIssue(id: "${updated._id}", issueInput:{status: "${updated.status}"}) {
          _id
          status
          title
        }
      }`).then(res => console.log(res))
      this.sendIssueUpdatedMessage(updated.title)
    },
    getTickets() {
      return DB.execute('query { issues { _id title location createdAt stakeholders { title } status }}', this.$store.getters.GET_TOKEN)
        .then(res => res.issues)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';
.d-tickets {
  @media screen and (min-width: 60rem) {
    display: flex;
  }
  &__column {
    margin-right: $margin-m;
    padding-bottom: 10rem;
    flex: 1;
    &-title {
      font-size: 1.25rem;
      font-weight: normal;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
