<template>
  <div class="d-container">
    <h2>Inzichten</h2>
    <Tile>
      <h3>Grafiek titel</h3>
      <img src="https://unsplash.it/500/200" alt>
    </Tile>
  </div>
</template>
<script>
import { Line } from 'vue-chartjs'
import Tile from '~/components/dashboard/Tile.vue'

export default {
  extends: Line,
  layout: 'dashboard',
  components: {
    Tile
  },
  mounted() {
    this.renderChart(
      {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#FC2525',
            data: [40, 39, 10, 40, 39, 80, 40]
          },
          {
            label: 'Data Two',
            backgroundColor: '#05CBE1',
            data: [60, 55, 32, 10, 2, 12, 53]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    )
  }
}
</script>
