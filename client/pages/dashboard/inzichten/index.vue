<template>
  <div>
    <h2>Inzichten</h2>
    <div class="d-container">
      <Tile>
        <BarChart v-if="BarChartDataThree" :data="BarChartDataThree" :options="barChartOptions"/>
      </Tile>

      <Tile>
        <Doughnut v-if="DoughNutData" :data="DoughNutData" :options="DoughnutOptions"/>
      </Tile>
    </div>
  </div>
</template>
<script>
//import { Line } from 'vue-chartjs'
import Tile from '~/components/dashboard/Tile.vue'
import BarChart from '~/components/dashboard/charts/Bar'
import Doughnut from '~/components/dashboard/charts/Doughnut'
import LineChart from '~/components/dashboard/charts/LineChart'
import axios from 'axios'
import { log } from 'util'

export default {
  layout: 'dashboard',
  components: {
    Tile,
    BarChart,
    Doughnut,
    LineChart
  },
  data() {
    return {
      loaded: false,
      BarChartDataThree: null,
      stations: this.$store.getters.GET_LOADINGSTATION_DATA,
      datacollection: null,
      barChartOptions: {
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        tooltips: {
          displayColors: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      DoughnutOptions: {
        tooltips: {
          displayColors: false
        }
      },
      DoughNutData: null
    }
  },
  async mounted() {
    if (this.stations.length === 0) {
      const data = await this.$store.dispatch('FETCH_LOADINGSTATION_DATA')
      this.stations = this.$store.getters.GET_LOADINGSTATION_DATA
    }

    this.createBarChart()
    this.createPieChart()
  },
  methods: {
    createPieChart() {
      console.log(this.stations)
      const total = this.stations
        .map(item => Number(item.status.available))
        .reduce((total, item) => total + item)

      const currentlyLoading = this.stations
        .map(item => Number(item.status.charging))
        .reduce((total, item) => total + item)

      this.DoughNutData = {
        datasets: [
          {
            data: [total - currentlyLoading, currentlyLoading],
            backgroundColor: ['#27b5a2', '#ef4c5b']
          }
        ],
        labels: ['Free', 'Loading']
      }
    },
    createBarChart() {
      fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.getters.GET_TOKEN
        },
        body: JSON.stringify({
          query:
            'query { issues { title location createdAt stakeholders { title } status } stakeholders { _id title } }'
        })
      })
        .then(res => res.json())
        .then(res => {
          // res.data
          // res.data.issues [{stakeholder: {title: 'string'}}]
          //console.log(res.data.issues)
          const stakeholders = res.data.issues.map(
            issue => issue.stakeholders.title
          )

          const countStakeholders = this.countOccurence(stakeholders)

          this.BarChartDataThree = {
            labels: res.data.stakeholders.map(item => item.title),
            datasets: [
              {
                label: 'Issues',
                data: [10, 20, 30],
                backgroundColor: ['#27b5a2', '#ef4c5b', '#684be2']
              }
            ]
          }
        })
        .catch(err => console.log(err))
    },
    countOccurence(arr) {
      const counts = {}

      for (let i = 0; i < arr.length; i++) {
        const num = arr[i]
        counts[num] = counts[num] ? counts[num] + 1 : 1
      }
      return counts
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.d-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: $padding-l;
}
</style>

