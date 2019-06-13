<template>
  <div class="d-container">
    <h2>Overzicht</h2>
    <div class="d-overview__holder">
      <div class="d-overview__column">
        <Atlas height="50vh" :showCurrentLocation="true" />
      </div>
      <div class="d-overview__column">
        <Toggle :checked.sync="toggles.first">
          This is a toggle
        </Toggle>
        <Toggle :checked.sync="toggles.second">
          This is another toggle
        </Toggle>
      </div>
    </div>
    <button  name="button" class="btn btn--primary" @click="setStakeholder">Set global stakeholder to {{newStakeholder}}</button>
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
      toggles: {
        first: false,
        second: false
      }
    }
  },
  computed: {
    stakeholder() {
      return this.$store.getters.GET_STAKEHOLDER
    },
    newStakeholder() {
      return this.stakeholders.filter(item => item.toLowerCase() !== this.stakeholder.toLowerCase())[0]
    }
  },
  methods: {
    setStakeholder() {
      this.$store.commit('SET_STAKEHOLDER', this.newStakeholder)

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
      flex: 1;
      @media screen and (min-width: 60rem) {
        margin-right: $margin-xl;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }

</style>
