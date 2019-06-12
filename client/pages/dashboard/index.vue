<template>
  <div class="d-container">
    <h2>Overzicht</h2>
    <img src="https://unsplash.it/800/200" alt="">

    <button  name="button" class="btn btn--primary" @click="setStakeholder">Set global stakeholder to {{newStakeholder}}</button>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      stakeholders: ['NUON', 'Gemeente']
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
