<template>
  <div class="d-container">
    <h2>Meldingen</h2>
    <TicketFilter :list="data" v-on:filtered="filter"/>
    <div class="d-tickets">
      <div class="d-tickets__column">
        <h3 class="d-tickets__column-title">Gemeld</h3>
        <hr class="hr">
        <TicketList :list="openList" group="tickets" status="open" @change="update"/>
      </div>
      <div class="d-tickets__column">
        <h3 class="d-tickets__column-title">In behandeling</h3>
        <hr class="hr">
        <TicketList :list="workingList" group="tickets" status="working" @change="update"/>
      </div>
      <div class="d-tickets__column">
        <h3 class="d-tickets__column-title">Afgehandeld</h3>
        <hr class="hr">
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
      endpoint:
        process.env.NODE_ENV == 'development'
          ? process.env.DEV_URL
          : process.env.PROD_URL,
      list: [],
      data: []
    }
  },
  mounted() {
    const socket = socketIOClient(this.endpoint)

    socket.on('issue has been created', (issue) => {
      console.log('issue has been created', issue);
      this.getTickets()
        .then(res => {
          this.list = res
          this.data = res
        })
        .catch(console.error)
    })

    this.getTickets()
      .then(res => {
        this.list = res
        this.data = res
        if (this.$route.query && this.$route.query.id) {
          this.setFocus(this.$route.query.id)
        }
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
  watch: {
    list(arr) {
      if (arr.length === 0) {
        this.getTickets().then(res => (this.list = res))
      }
    }
  },
  methods: {
    filter(newList) {
      this.list = newList
    },
    setFocus(id) {
      setTimeout(() => {
        const focus = document.querySelector(`[data-id="${id}"]`)
        focus.classList.add('focus')
        const reset = () => {
          focus.removeEventListener('mouseover', reset)
          focus.classList.remove('focus')
        }
        focus.addEventListener('mouseover', reset)
      }, 0)
    },
    sendIssueUpdatedMessage(issue) {
      const socket = socketIOClient(this.endpoint)
      console.log('issue: ', issue)
      socket.emit('issue has been updated', {
        title: issue.title,
        _id: issue._id,
        status: issue.status,
        loadingstation: { _id: issue.loadingstation._id },
        location: issue.location
      })
    },
    update(updated) {
      const index = this.list.findIndex(ticket => ticket._id == updated._id)
      if (index > -1) {
        this.list[index].status = updated.status
      }
      DB.execute(
        `mutation {
        updateIssue(id: "${updated._id}", issueInput:{status: "${
          updated.status
        }"}) {
          _id
          status
          title
        }
      }`
      ).then(res => console.log(res))
      DB.execute(
        `mutation {
        updateLoadingstation(id: "${
          updated.loadingstation._id
        }", loadingstationInput:{status: "${updated.status}"}) {
          _id
          status
        }
      }`
      ).then(res => console.log(res))
      this.$store.commit('UPDATE_LOADINGSTATION', {
        _id: updated._id,
        status: updated.status,
        loadingstation: { _id: updated.loadingstation._id }
      })
      this.sendIssueUpdatedMessage(updated)
    },
    getTickets() {
      return DB.execute(
        'query { issues { _id title location createdAt stakeholders { title } loadingstation { _id } status }}',
        this.$store.getters.GET_TOKEN
      ).then(res => res.issues)
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
    @media screen and (min-width: 60rem) {
      margin-right: $margin-m;
    }
    padding-bottom: $margin-xl * 2;
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
