<template>
  <div class="d-container">
    <h2>Inzichten</h2>
    <Tile>
      <h3>Grafiek titel</h3>
      <img src="https://unsplash.it/500/200" alt="">
    </Tile>
  </div>
</template>
<script>
import Tile from '~/components/dashboard/Tile.vue'
export default {
  layout: 'dashboard',
  components: {
    Tile
  }
}

</script>
