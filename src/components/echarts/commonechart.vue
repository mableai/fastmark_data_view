<template>
  <div :style="{width: '100%', height: height }" ref="myChart"></div>
</template>
 import '../../node_modules/echarts/map/js/china.js';
  import '../../node_modules/echarts/theme/macarons.js';
<script>
  export default {
    name: "commonechart",
    data() {
      return {
        chart: null,
      }
    },
    //props:["height", "option"],
    props: {
      height: {
        type: String,
        required: true,
        default: '600px'
      },
      option: {
        type: Object,
        required: true,
        default: function () {
          return {}
        }
      }
    },
    mounted() {
      // console.log('图表的option', this.option)
      // console.log('图表的height', this.height)
      this.initChart(this.option)
    },
    watch: {
      // 对象的watch监听
      option: {
        handler(newValue, oldValue) {
          //  console.log("newValue",newValue);
          //   console.log("oldValue",oldValue);
          this.initChart(newValue)
        },
        deep: true, //深度监听
        immediate: true
      },

    },
    methods: {
      initChart(o) {
        let myChart = this.$refs.myChart
        if (myChart) {
          this.chart = this.$echarts.init(myChart,'macarons')
          this.chart.setOption(o)
          window.addEventListener('resize', () => {
            //console.log('柱形图---addEventListener')
            this.chart.resize()
          })
        }

      },
    }
  }
</script>

<style scoped>

</style>
