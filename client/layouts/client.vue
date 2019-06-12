<template>
  <div class="layout">
    <nuxt/>
    <Menu/>
  </div>
</template>

<script>
import Menu from '~/components/client/Menu.vue'

export default {
  components: {
    Menu
  }
}
</script>

<style lang="scss">
@import '~/assets/css/main.scss';

.layout {
  margin-bottom: 5rem;
}
</style>
