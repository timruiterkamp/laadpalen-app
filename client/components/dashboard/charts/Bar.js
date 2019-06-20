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
    let datasets = this.data.datasets[0]

    if (datasets.gradientColor) {
      const gradientColors = datasets.gradientColor

      this.gradient = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 450)

      gradientColors.forEach((color, i) => {
        this.gradient.addColorStop(i, color)
      })

      datasets.backgroundColor = this.gradient
    }

    this.renderChart(this.data, this.options)
  }
}
