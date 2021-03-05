<template>
  <div ref="myChart" id="my-chart">
    <!-- 图表 -->
  </div>
</template>

<script>
import options from './options'
export default {
  name: 'Chart',
  data() {
    return {
      chart: {},
      realTimeData: '',
    }
  },

  mounted() {
    this.chart = this.$echarts.init(this.$refs.myChart)
    // this.chart.clear()
    this.chart.setOption(options, true)
    //解决初次生成会超过父容器宽度
    setTimeout(() => {
      this.chart.resize()
    }, 1)

    window.addEventListener('resize', () => {
      // console.log(this.chart)
      if (this.chart) {
        this.chart.resize()
      }
    })
    this.realTimeData = setInterval(this.queryData, 1000)
  },
  methods: {
    queryData() {
      setTimeout(() => {
        let date = new Date()
        const now = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        // const xData = options.xAxis.data.shift().push(now)
        const xData = options.xAxis.data
        xData.shift()
        xData.push(now)

        const value = Math.floor(Math.random() * 100)
        const yData = options.series[0].data
        yData.shift()
        yData.push(value)

        this.chart.setOption({
          xAxis: {
            data: xData,
          },
          series: [
            {
              name: '销量',
              data: yData,
            },
          ],
        })
      }, 500)
    },
  },
  beforeDestroy() {
    console.log('销毁组件')
    console.log(this.realTimeData)
    window.removeEventListener('resize', this.chart.resize) //
    clearInterval(this.realTimeData)
    // this.chart = null //销毁实例，避免刷新卡顿
  },
}
</script>
<style lang="scss">
#my-chart {
  width: 100%;
  height: 400px;
}
</style>
