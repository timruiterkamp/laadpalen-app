<template>
  <div class="c-map">
    <Atlas height="calc(100vh - 5rem)" :stations="stations"/>
  </div>
</template>

<script>
import Atlas from '~/components/shared/Atlas.vue'

export default {
  layout: 'client',
  components: {
    Atlas
  },
  data() {
    return {
      stations: this.$store.getters.GET_LOADINGSTATION_DATA
    }
  },
  mounted() {
    if (this.stations.length === 0) {
      this.$store.dispatch('FETCH_LOADINGSTATION_DATA')
        .then(() => this.stations = this.$store.getters.GET_LOADINGSTATION_DATA)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
