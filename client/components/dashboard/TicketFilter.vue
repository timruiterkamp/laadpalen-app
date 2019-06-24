<template>
  <div class="d-ticket-filter">
    <Toggle class="d-ticket-filter__toggle" v-for="stakeholder in stakeholders" :key="stakeholder" v-model="toggles[shorten(stakeholder)]">{{shorten(stakeholder)}}</Toggle>
  </div>
</template>

<script>
  import Toggle from '~/components/dashboard/Toggle.vue'
  export default {
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    components: {
      Toggle
    },
    data() {
      return {
        toggles: {
          nuon: true,
          gemeente: true
        }
      }
    },
    computed: {
      stakeholders() {
        const stakeholders = this.list
          .map(ticket => ticket.stakeholders.title)
          .filter((val, index, self) => self.indexOf(val) === index)

        return stakeholders
      },
    },
    watch: {
      toggles: {
        handler(toggles) {
          this.filterList(toggles)
        },
        deep: true
      }
    },
    methods: {
      shorten(stakeholder) {
        stakeholder = stakeholder.toLowerCase().trim()
        if (stakeholder === 'gemeente amsterdam') return 'gemeente'
        if (stakeholder === 'nuon') return 'nuon'
        if (stakeholder === 'idolaad') return 'idolaad'
        return 'algemeen'
      },
      filterList(toggles) {
        const toggleKeys = Object.keys(toggles);
        const activeToggles = toggleKeys.filter(key=> {
            return toggles[key]
        })

        const filtered = this.list
          .filter(item => activeToggles.includes(this.shorten(item.stakeholders.title)))
        this.$emit('filtered', filtered)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/css/config/main.scss';

  .d-ticket-filter {
    display: flex;
    margin-bottom: $margin-m;
    &__toggle {
      margin-right: $margin-m;
    }
  }
</style>
