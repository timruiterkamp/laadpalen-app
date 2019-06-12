<template>
  <div class="d-container">
    <h2>Meldingen</h2>
    <div class="d-tickets">
      <div class="d-tickets__column">
        <h3 class="d-tickets__column-title">Open</h3>
        <hr class="d-hr">
        <TicketList :list="openList" group="tickets" status="open" @change="update" />
      </div>
      <div class="d-tickets__column">
        <h3>Working</h3>
        <hr class="d-hr">
        <TicketList :list="workingList" group="tickets" status="working" @change="update" />
      </div>
      <div class="d-tickets__column">
        <h3>Closed</h3>
        <hr class="d-hr">
        <TicketList :list="closedList" group="tickets" status="closed" @change="update" />
      </div>
    </div>
  </div>

</template>
<script>
import TicketList from '~/components/dashboard/TicketList.vue'
export default {
  layout: 'dashboard',
  components: {
    TicketList
  },
  data() {
    return {
      list: [
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
      ]
    }
  },
  computed: {
    openList() {
      return this.list
        .filter(ticket => ticket.status === 'open')
        .sort((ticketA, ticketB) => new Date(ticketB.created) - new Date(ticketA.created))
    },
    workingList() {
      return this.list
        .filter(ticket => ticket.status === 'working')
        .sort((ticketA, ticketB) => new Date(ticketB.created) - new Date(ticketA.created))
    },
    closedList() {
      return this.list
        .filter(ticket => ticket.status === 'closed')
        .sort((ticketA, ticketB) => new Date(ticketB.created) - new Date(ticketA.created))
    },
    stakeholder() {
      return this.$store.getters.GET_STAKEHOLDER
    }
  },
  methods: {
    update(updated) {
      const index = this.list.findIndex(ticket => ticket.id == updated.id)
      if (index > -1) {
        this.list[index].status = updated.status
      }
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
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
</style>
