<template>
  <div class="d-container">
    <h2>Inzichten</h2>

    <div class="d-container__tiles">
      <Tile>
        <h3>Aantal issues per instantie</h3>
        <div class="d-chart-holder">
          <BarChart v-if="BarChartDataThree" :data="BarChartDataThree" :options="barChartOptions"/>
        </div>
      </Tile>

      <Tile>
        <h3>Laadpalen beschikbaar vs bezet</h3>
        <div class="d-chart-holder">
          <Doughnut v-if="DoughNutData" :data="DoughNutData" :options="DoughnutOptions"/>
        </div>
      </Tile>
    </div>
  </div>
</template>

<script>
import Tile from '~/components/dashboard/Tile.vue'
import BarChart from '~/components/dashboard/charts/Bar'
import Doughnut from '~/components/dashboard/charts/Doughnut'
import LineChart from '~/components/dashboard/charts/LineChart'
import DB from '~/helpers/db'
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
                beginAtZero: true,
                callback: value => {
                  if (value % 1 === 0) return value
                }
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
    this.createPieChart()
    this.createBarChart()
  },
  methods: {
    createPieChart() {
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
        labels: ['Beschikbaar', 'Bezet']
      }
    },
    createBarChart() {
      DB.execute(
        `query {
          issues {
            title
            location
            createdAt
            stakeholders {
              title
            }
            status
          }
        }`,
        this.$store.getters.GET_TOKEN
      )
        .then(res => {
          const stakeholders = Object.keys(
            countOccurence(
              res.issues.map(issue => issue.stakeholders.title.toLowerCase())
            )
          )
          const stakeholderObjects = stakeholders.map(stakeholder => ({
            stakeholder,
            issues: res.issues.filter(
              issue => issue.stakeholders.title.toLowerCase() === stakeholder
            )
          }))

          this.BarChartDataThree = {
            labels: stakeholders,
            datasets: [
              {
                label: 'Issues',
                data: stakeholderObjects.map(
                  stakeholder => stakeholder.issues.length
                ),
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

.d-chart-holder {
  position: relative;
  max-width: 80vw;
  display: block;
  margin: 0 auto;
  height: auto;
}
.d-container {
  &__tiles {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: $padding-l;
    @media screen and (max-width: 1100px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 915px) {
      grid-template-columns: 100%;
    }
  }
}
</style>
