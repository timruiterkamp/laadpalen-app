<template>
  <div class="d-container">
    <h2>Meldingen</h2>
    <div class="d-tickets">
      <div class="d-tickets__column">
        <h3>Open</h3>
        <hr>
        <TicketList :list="openList" group="tickets" status="open" @change="list => open = list" />
      </div>
      <div class="d-tickets__column">
        <h3>Working</h3>
        <hr>
        <TicketList :list="workingList" group="tickets" status="working" @change="list => working = list" />
      </div>
      <div class="d-tickets__column">
        <h3>Closed</h3>
        <hr>
        <TicketList :list="closedList" group="tickets" status="closed" @change="list => closed = list" />
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
      open: [
        {
          title: 'Some ticket title 1',
          stakeholder: 'NUON',
          status: 'open',
          created: '2019-06-12T12:00:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        },
        {
          title: 'Some ticket title 2',
          stakeholder: 'Gemeente',
          status: 'open',
          created: '2019-06-12T13:00:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        }
      ],
      working: [
        {
          title: 'Some ticket title 3',
          stakeholder: 'NUON',
          status: 'working',
          created: '2019-06-12T09:00:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        },
        {
          title: 'Some ticket title 4',
          stakeholder: 'NUON',
          status: 'working',
          created: '2019-06-12T12:00:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        },
        {
          title: 'Some ticket title 5',
          stakeholder: 'NUON',
          status: 'working',
          created: '2019-06-12T10:00:00+00:00',
          location: 'Nieuwe Herenstraat 37 1332PT Amsterdam'
        },
      ],
      closed: [
        {
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
      return this.open.sort((ticketA, ticketB) => new Date(ticketB.created) - new Date(ticketA.created))
    },
    workingList() {
      return this.working.sort((ticketA, ticketB) => new Date(ticketB.created) - new Date(ticketA.created))
    },
    closedList() {
      return this.closed.sort((ticketA, ticketB) => new Date(ticketB.created) - new Date(ticketA.created))
    },
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
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
</style>
