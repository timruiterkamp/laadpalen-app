<template>
  <div class="d-container">
    <h2>Meldingen</h2>
    <!-- <TicketFilter :list="allIssues" @filtered="filter"/> -->
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

export default {
  layout: 'dashboard',
  components: {
    TicketList,
    TicketFilter
  },
  data() {
    return {
      endpoint: 'localhost:3001',
      allIssues: [],
      data: [
        {
          id: '1',
          title: 'Some ticket title 1',
          stakeholder: 'NUON',
          status: 'open',
          created: '2019-06-12T12:00:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        },
        {
          id: '2',
          title: 'Some ticket title 2',
          stakeholder: 'Gemeente',
          status: 'open',
          created: '2019-06-12T13:00:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        },
        {
          id: '3',
          title: 'Some ticket title 3',
          stakeholder: 'NUON',
          status: 'working',
          created: '2019-06-12T09:00:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        },
        {
          id: '4',
          title: 'Some ticket title 4',
          stakeholder: 'NUON',
          status: 'working',
          created: '2019-06-12T12:00:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        },
        {
          id: '5',
          title: 'Some ticket title 5',
          stakeholder: 'NUON',
          status: 'working',
          created: '2019-06-12T10:00:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        },
        {
          id: '6',
          title: 'Some ticket title 6',
          stakeholder: 'Gemeente',
          status: 'closed',
          created: '2019-06-12T10:30:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        }
      ],
      list: []
    }
  },
  mounted() {
    //this.list = this.data
    this.getTickets()
      .then(() => (this.list = this.allIssues))
      .catch(err => console.log(err))
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
      const index = this.list.findIndex(ticket => ticket.id == updated.id)
      if (index > -1) {
        this.list[index].status = updated.status
      }
      //console.log('updated')
      this.sendIssueUpdatedMessage('Laadpaal defect')
    },
    getTickets() {
      return fetch('http://localhost:3001/graphql', {
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
        .then(res => {
          this.allIssues = res.data.issues
        })
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
