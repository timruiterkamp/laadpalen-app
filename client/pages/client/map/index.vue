<template>
  <div class="c-map">
    <Atlas height="calc(100vh - 5rem)"/>
  </div>
</template>

<script>
import Atlas from '~/components/shared/Atlas.vue'

export default {
  layout: 'client',
  components: {
    Atlas
  }
}
</script>

<style lang="scss" scoped>
</style>
