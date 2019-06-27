<template>
  <div class="d-container">
    <h2>Overzicht</h2>
    <div class="d-overview__holder">
      <div class="d-overview__column">
        <Atlas height="60vh" :showCurrentLocation="false" :stations="filteredStations"/>
      </div>
      <div class="d-overview__column">
        <Toggle v-model="filters.open">Melding niet in behandeling</Toggle>
        <Toggle v-model="filters.working">Melding in behandeling</Toggle>
        <Toggle v-model="filters.closed">Melding opgelost</Toggle>
      </div>
    </div>
  </div>
</template>
<script>
import Atlas from '~/components/shared/Atlas.vue'
import Toggle from '~/components/dashboard/Toggle.vue'
import socketIOClient from 'socket.io-client'

export default {
  layout: 'dashboard',
  components: {
    Atlas,
    Toggle
  },
  data() {
    return {
      endpoint:
        process.env.NODE_ENV == 'development'
          ? process.env.DEV_URL
          : process.env.PROD_URL,
      filters: {
        open: false,
        working: false,
        closed: false
      }
    }
  },
  async mounted() {
    if (this.stations.length === 0) {
      this.$store.dispatch('FETCH_LOADINGSTATION_DATA')
    }
    const socket = socketIOClient(this.endpoint)
    socket.on('issue has been created', () => {
      this.$store.dispatch('FETCH_LOADINGSTATION_DATA')
    })
  },
  computed: {
    stations() {
      return this.$store.getters.GET_LOADINGSTATION_DATA
    },
    filteredStations() {
      return this.filter(this.stations)
    },
    newStakeholder() {
      return this.stakeholders.filter(
        item => item.toLowerCase() !== this.stakeholder.toLowerCase()
      )[0]
    }
  },
  methods: {
    filter(stations) {
      let filtered = []
      const filters = this.filters

      if (!filters.open && !filters.working && !filters.closed) {
        filtered = filtered.concat(stations)
      } else {
        if (filters.open) {
          filtered = filtered.concat(
            stations.filter(station => station.status === 'open')
          )
        }
        if (filters.working) {
          filtered = filtered.concat(
            stations.filter(station => station.status === 'working')
          )
        }
        if (filters.closed) {
          filtered = filtered.concat(
            stations.filter(station => station.status === 'closed')
          )
        }
      }
      return filtered
    }
  },
  watch: {
    filters: {
      handler(filter) {
        this.filter(this.stations)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/config/main.scss';

.d-overview {
  &__holder {
    @media screen and (min-width: 60rem) {
      display: flex;
    }
  }
  &__column {
    flex: 2;
    &:last-of-type {
      flex: 1;
    }
    @media screen and (min-width: 60rem) {
      margin-right: $margin-xl;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
