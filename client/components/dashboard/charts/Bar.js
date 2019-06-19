import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    data: {
      type: Object,
      default: null,
      required: true
    },
    options: {
      type: Object,
      default: null,
      required: true
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  }
}
