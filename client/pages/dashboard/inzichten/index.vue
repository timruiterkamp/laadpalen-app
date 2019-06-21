<template>
  <div class="d-container">
    <h2>Inzichten</h2>

    <div class="d-container__tiles">
      <Tile>
        <p>Aantal issues</p>
        <BarChart v-if="BarChartDataThree" :data="BarChartDataThree" :options="barChartOptions"/>
      </Tile>

      <Tile>
        <p></p>
        <Doughnut v-if="DoughNutData" :data="DoughNutData" :options="DoughnutOptions"/>
      </Tile>
    </div>
  </div>
</template>

<script>
import Tile from '~/components/dashboard/Tile.vue'
import BarChart from '~/components/dashboard/charts/Bar'
import Doughnut from '~/components/dashboard/charts/Doughnut'
import LineChart from '~/components/dashboard/charts/LineChart'
import axios from 'axios'
import { log } from 'util'

import hexToRGB from '~/helpers/hexToRGB'
import countOccurence from '~/helpers/countOccurence'

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
        responsive: true,
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
        responsive: true,
        tooltips: {
          displayColors: false
        }
      },
      DoughNutData: null
    }
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
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
        .map(item => item.sockets)
        .reduce((total, item) => total + item)

      console.log(total)
      const currentlyLoading = this.stations
        .map(item => item.usedsockets)
        .reduce((total, item) => total + item)

      this.DoughNutData = {
        datasets: [
          {
            data: [total - currentlyLoading, currentlyLoading],
            backgroundColor: [
              hexToRGB('#27b5a2', 0.3),
              hexToRGB('#ef4c5b', 0.3)
            ],
            borderColor: ['#27b5a2', '#ef4c5b']
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

          const countStakeholders = countOccurence(stakeholders)

          this.BarChartDataThree = {
            labels: res.data.stakeholders.map(item => item.title),
            datasets: [
              {
                label: 'Issues',
                data: [10, 20, 30],
                gradientColor: ['#27b5a2', '#4bd6c3'],
                backgroundColor: 'no'
              }
            ]
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/config/main.scss';

.d-container {
  &__tiles {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: $padding-l;
    @media screen and (max-width: 1100px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 915px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>

