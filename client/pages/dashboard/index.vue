<template>
  <div class="d-container">
    <h2>Overzicht</h2>
    <div class="d-overview__holder">
      <div class="d-overview__column">
        <Atlas height="60vh" :showCurrentLocation="true" :stations="stations" />
      </div>
      <div class="d-overview__column">
        <Toggle v-model="filters.open">Melding niet in behandeling</Toggle>
        <Toggle v-model="filters.working">Melding in behandeling</Toggle>
        <Toggle v-model="filters.closed">Melding opgelost</Toggle>
      </div>
    </div>
    <button
      name="button"
      class="btn btn--primary"
      @click="setStakeholder"
    >Set global stakeholder to {{newStakeholder}}</button>
  </div>
</template>
<script>
import Atlas from '~/components/shared/Atlas.vue'
import Toggle from '~/components/dashboard/Toggle.vue'

export default {
  layout: 'dashboard',
  components: {
    Atlas,
    Toggle
  },
  data() {
    return {
      stakeholders: ['NUON', 'Gemeente'],
      filters: {
        open: true,
        working: true,
        closed: true
      },
      stations: this.$store.getters.GET_LOADINGSTATION_DATA
    }
  },
  async mounted() {
    if (this.stations.length === 0) {
      const data = await this.$store.dispatch('FETCH_LOADINGSTATION_DATA')
      this.stations = this.$store.getters.GET_LOADINGSTATION_DATA
    }
  },
  computed: {
    stakeholder() {
      return this.$store.getters.GET_STAKEHOLDER
    },
    newStakeholder() {
      return this.stakeholders.filter(
        item => item.toLowerCase() !== this.stakeholder.toLowerCase()
      )[0]
    }
  },
  methods: {
    setStakeholder() {
      this.$store.commit('SET_STAKEHOLDER', this.newStakeholder)
    }
  },
  watch: {
    filters: {
      handler(filter) {
        const all = this.$store.getters.GET_LOADINGSTATION_DATA
        const temp = []
        if (filter.open && filter.working && filter.closed) {
          temp.concat(all)
        } else {
          if (filter.open) {
            temp.concat(all.filter(station => station.status === 'open'))
          }
          if (filter.working) {
            temp.concat(all.filter(station => station.status === 'working'))
          }
          if (filter.closed) {
            temp.concat(all.filter(station => station.status === 'closed'))
          }
        }
        console.log(temp, filter);
        this.stations = temp
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
