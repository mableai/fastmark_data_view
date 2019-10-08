<template>
  <div class="contentBox">
    <date-time @search="searchConfirm" :defaultDate="defaultDate"></date-time>
    <div class="echartsBox">
      <Row :gutter="32">
        <Col span="10">
          <div class="leftEcharts">
            <common-echart :option="funnelOption" height="720px"></common-echart>
            <Alert style="margin-top: 20px;">（注：可通过点击下方文字来调节对应层级的显示与隐藏）</Alert>
          </div>
        </Col>
        <Col span="14">
          <div class="rightBox">
            <Row :gutter="22">
              <Col span="6">
                <div class="topBox">
                  <div class="hrBox"></div>
                  <Card style="width:100%;height: 100%" :shadow="true">
                    <div style="text-align:center">
                      <span style="font-size: 50px;color: #666666;">{{ pageView ? pageView : 0 }}</span>
                      <h3>总浏览量(PV)</h3>
                    </div>
                  </Card>
                </div>
              </Col>
              <Col span="6">
                <div class="topBox">
                  <div class="hrBox"></div>
                  <Card style="width:100%;height: 100%" :shadow="true">
                    <div style="text-align:center">
                      <span style="font-size: 50px;color: #666666;">{{ uniqueVisitor ? uniqueVisitor : 0 }}</span>
                      <h3>总浏览人数(UV)</h3>
                    </div>
                  </Card>
                </div>
              </Col>
              <Col span="6">
                <div class="topBox">
                  <div class="hrBox"></div>
                  <Card style="width:100%;height: 100%" :shadow="true">
                    <div style="text-align:center">
                      <span style="font-size: 50px;color: #666666;">{{ sharerAmount ? sharerAmount : 0 }}</span>
                      <h3>
                        总分享人数
                        <Tooltip
                          style="margin-left:5px;cursor: pointer;"
                          content="适用于需提前输入指定信息的活动。"
                          placement="top"
                          max-width="300"
                        >
                          <Icon type="ios-help-circle" style="color: #989898;vertical-align: text-top;" />
                        </Tooltip>
                      </h3>
                    </div>
                  </Card>
                </div>
              </Col>
              <Col span="6">
                <div class="topBox">
                  <div class="hrBox"></div>
                  <Card style="width:100%;height: 100%" :shadow="true">
                    <div style="text-align:center">
                      <span style="font-size: 50px;color: #666666;">{{ smsSendAmount ? smsSendAmount : 0 }}</span>
                      <h3>短信触达人数</h3>
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>
            <div class="rightEcharts">
              <common-echart :option="lineOption" height="565px"></common-echart>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { postExample, getExample } from "@/api/example/index";
import { getNowDate, toFixedNumber } from '@/utils'
//import echarts from 'echarts'
import commonEchart from "@/components/echarts/commonechart";
import dateTime from "@/components/datePicker/dateTime";
import { getBaseDateTotal, getBaseDate } from '@/api/example'
export default {
  name: "baseData",
  components: {
    commonEchart,
    dateTime
  },
  data() {
    return {
      lineOption: {
        title: {
          text: "基础数据折线图",
          textStyle: {
            color: '#666666',
            fontSize: 22
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis',
        },
        legend: {
          data: ["浏览量（PV）", "浏览人数（UV）", "总分享人数", "短信触达人数"],
          x: "7%",
          y: "10%",
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 50
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 50
          }
        ],
        xAxis: [{
          name: "",
          type: 'category',
          data: ["09:06", "09:07", "09:08", "09:09", "09:10",],
          axisLabel: {
            interval: 0, //横轴信息全部显示
            //   rotate: 30, //60度角倾斜显示
            textStyle: {
              color: "#000"
            }
          },
          axisLine: {
            lineStyle: {
              color: '#008acd' //坐标轴线颜色
            }
          },
          boundaryGap: false,
        }],
        yAxis: [{
          type: 'value',
          name: '',
          nameTextStyle: {
            color: '#008acd'
          },
          axisLine: {
            lineStyle: {
              color: '#008acd' //坐标轴线颜色
            }
          }
        }],
        grid: {
          x: "5%",
          x2: "5%",
          y: "20%",
          y2: "12%",
        },
        color: ['#52b4ff', '#fa7de5', '#48dff0', '#ff7370', '#5ce5aa', '#ffb870', '#bc84f5', '#fae164', '#778eff', '#ff7faa'],
        series: [
          {
            name: "浏览量（PV）",
            type: "line",
            data: [11, 23, 14, 16, 43]
          },
          {
            name: "浏览人数（UV）",
            type: "line",
            data: [61, 73, 51, 71, 88]
          },
          {
            name: "总分享人数",
            type: "line",
            data: [33, 56, 44, 56, 59]
          },
          {
            name: "短信触达人数",
            type: "line",
            data: [5, 13, 33, 44, 39]
          },
        ]
      },
      // option2: {
      //   title: {					// 图表标题
      //     text: '基础数据漏斗',					// 标题文本内容
      //     left: '0%',						// 标题距容器左侧5%
      //     top: '0%',						// 标题距容器顶部5%
      //     textStyle: {					// 标题文本样式
      //       color: '#666666',					// 字体颜色
      //       fontSize: 22,					// 字体大小
      //     }
      //   },
      //   // 弹框提示
      //   tooltip: {
      //     trigger: 'item',
      //     formatter: "{a} <br/>{b} : {c}%"    // a对应系列名称,b对应数据项名称,c对应数据项值.
      //   },
      //   // 图例
      //   legend: {
      //     data: ['核销量', '领奖量', '中奖量', '参与量', '浏览量'],
      //     bottom: '0',
      //     left: '0%'
      //   },
      //   // 金字塔块的颜色
      //   color: ['#949494', '#6b6b6b', '#434343', '#282828', '#000000'],
      //   // 系列
      //   series: [
      //     // 系列1 (外部)
      //     {
      //       name: '基础数据漏斗',
      //       type: 'funnel',
      //       x: '-40%',
      //       //left: '10%',
      //       width: '80%',
      //       sort : 'descending',     // 金字塔形:'ascending',  漏斗图形:'descending'
      //       label: {
      //         normal: {
      //           formatter: '{b}\n{c}%',    // 金字塔外标签
      //           fontSize: 16,
      //           color: '#2f2f2f'
      //         }
      //       },
      //       labelLine: {        // 标签的视觉引导线样式
      //         normal: {
      //           show: true,      // 是否显示引导线
      //           length:	270,		// 视觉引导线第一段的长度。
      //           lineStyle: {
      //             type: 'dotted',
      //             width: 1,
      //             color: '#aeaeae'
      //           }
      //         },
      //
      //       },
      //       itemStyle: {
      //         normal: {
      //           // 系列2图形透明度
      //           borderColor: '#fff',    // 图形边框颜色
      //           borderWidth: 10          // 图形边框宽度大小
      //         }
      //       },
      //       tooltip: {
      //         show: true			// 让系列一(金字塔外层图形的提示框不显示)
      //       },
      //       data: [
      //         {value: 20, name: '核销量'},
      //         {value: 40, name: '领奖量'},
      //         {value: 60, name: '中奖量'},
      //         {value: 80, name: '参与量'},
      //         {value: 100, name: '浏览量'}
      //       ]
      //     },
      //   ]
      // },
      funnelOption: {
        title: {					// 图表标题
          text: '基础数据漏斗',					// 标题文本内容
          left: '0%',						// 标题距容器左侧5%
          top: '0%',						// 标题距容器顶部5%
          textStyle: {					// 标题文本样式
            color: '#666666',					// 字体颜色
            fontSize: 22,					// 字体大小
          }
        },
        tooltip: {
          "trigger": "axis",
          "axisPointer": {
            "type": "cross",
            "label": {
              "backgroundColor": "#6a7985"
            },
            "lineStyle": {
              "color": "#9eb2cb"
            }
          }
        },

        legend: {
          "bottom": "0%",
          "left": "0%",
          "textStyle": {
            "color": "#000"
          },
          // "data":  ['浏览量', '参与量', '中奖量', '领奖量', '核销量', '分享量'],
          "data":  [],
        },
        grid: {
          "top": 24,
          "left": "2%",
          "right": 20,
          "bottom": 30,
          "containLabel": true,
          "borderWidth": 0.5
        },
        // 金字塔块的颜色
        color: ['#aeaeae', '#949494', '#6b6b6b', '#434343', '#282828', '#000000'],
        series: [
          {
            x: '-40%',
            name: '',
            type: 'funnel',
            //left: '10%',
            width: '80%',
            gap: 10,
            minSize: 114,
            maxSize: 390,
            label: {
              normal: {
                position: 'right',
                formatter: '{b}\n\n{c}%',
                fontSize: 16,
                color: '#2f2f2f',
              },

            },
            labelLine: {
              normal: {
                show: true,      // 是否显示引导线
                length:	270,		// 视觉引导线第一段的长度。
                lineStyle: {
                  type: 'dotted',
                  width: 1,
                  color: '#aeaeae'
                }
              },
            },
            itemStyle: {
              normal: {

              }
            },
            data: [],
          },
          {
            name: '',
            type: 'funnel',
            gap: 10,
            x: '-80%',
            label: {
              normal: {
                position: 'inside',
                formatter: '{c}',
                textStyle: {
                  color: '#fff'
                }
              }

            },
            labelLine: {
              normal: {


              }
            },
            itemStyle: {
              normal: {
                color: 'transparent',
                borderWidth:0,
                opacity: 0
              }
            },
            data: [],
          }
        ]
      },
      pageView: '',//总浏览量---1
      uniqueVisitor: '',//总浏览人数---2
      sharerAmount: '',//总分享人数---3
      smsSendAmount: '',//短信触达总量----4
      prizeCount: '',//中奖量----5
      awardsCount: '',//领奖量----6
      sharerCount: '',//分享量----7
      joinCount: '',//参与量---10
      searchDate: {
        "startDate": "",
        "endDate": getNowDate()
      },
      defaultDate: [],
    }
  },
  computed: {
    ...mapGetters([
      'playMethod'
    ])
  },
  created() {
    // 默认时间取活动开始时间，和当前时间
    this.searchDate.startDate = "2019-09-25";
    //this.searchDate.endDate = this.getNowDate();
    this.defaultDate[0] = this.searchDate.startDate;
    this.defaultDate[1] = this.searchDate.endDate;
    this.getLineList();
    this.getBaseDate();
  },
  mounted() {

  },
  methods: {
    //获取基础数据
    getBaseDate() {
      let needDataTypeSet = [1, 2, 3, 4, 5, 6, 7, 10];
      this.searchDate.needDataTypeSet = needDataTypeSet;
      let params = {
        "activityId": 104383,
        "businessList": [
          173,199
        ],
        "params": this.searchDate,
      }
      getBaseDateTotal(params).then(res => {
        if (res) {
          this.pageView = res.body['1'];//总浏览量
          this.uniqueVisitor = res.body['2'];//总浏览人数
          this.sharerAmount = res.body['3'];//总分享人数
          this.smsSendAmount = res.body['4'];//短信触达总量
          this.prizeCount = res.body['5'];//中奖量----5
          this.awardsCount = res.body['6'];//领奖量----6
          this.sharerCount = res.body['7'];//分享量----7
          this.joinCount = res.body['10'];//参与量----10
          let temp = [{
            value: this.pageView,
            name: "浏览量"
          }, {
            value: this.prizeCount,
            name: "中奖量"
          }, {
            value: this.awardsCount,
            name: "领奖量"
          }, {
            value: this.sharerCount,
            name: "分享量"
          }, {
            value: this.joinCount,
            name: "参与量"
          }];
          //TODO, 大问题， 漏斗图的两个series[0]data，会自动排序（未解决）,我们这里需要禁止他排序
          temp.sort(function (a, b) { return a.value - b.value});
          this.funnelOption.series[0].minSize = temp[0].value + + (temp[temp.length - 1].value * 1);
          this.funnelOption.series[0].maxSize = temp[temp.length - 1].value + (temp[temp.length - 1].value * 2);
          console.log(' this.funnelOption.series',  this.funnelOption.series)
          this.funnelOption.series[1].data = temp;
          temp.sort(function (a, b) { return b.value - a.value}).map((item, index) => this.funnelOption.legend.data.push(item.name))
          let tempPercentageArr = temp.sort(function (a, b) { return a.value - b.value});//百分比
          let arr = [];
          //TODO 文档：百分比计算公式：该层级百分比=该层级数量/上一 层级数量，  那么最顶部的哪个值得百分比如何得来？？
          for (let i = 0; i < tempPercentageArr.length; i++) {
            if (i === ((tempPercentageArr.length) - 1)) {
              arr[i] = {
                value: 100,
                name: tempPercentageArr[i].name
              };
            } else {
              arr[i] = {
                value: isNaN(tempPercentageArr[i].value / tempPercentageArr[i + 1].value) ? 0 : parseFloat(toFixedNumber((((tempPercentageArr[i].value / tempPercentageArr[i + 1].value) * 10000) / 100), 1)),
                name: tempPercentageArr[i].name
              };
            }
            console.log('arr', arr);
          }
          this.funnelOption.series[0].data = arr;
          console.log('temp', this.funnelOption.series[0].data)
        }
      }).catch((errorRes) => {

      })
    },
    // 获取折线图数据
    getLineList() {
      let params = {
        "activityId": 104383,
        "businessList": [
          173,199
        ],
        "params": this.searchDate
      }
      getBaseDate(params).then(res => {
        if (res) {
          let filterVal = ["pageView", "uniqueVisitor", "sharerAmount", "smsSendAmount"];
          const formatData = this.formatJson(filterVal, res.body);
          this.lineOption.xAxis[0].data = [];
          res.body.map((item, index) => {
            const arr = item.dataStatisticsDate.split('-')
            item.dataStatisticsDate = arr[1] + '-' + arr[2];
            this.lineOption.xAxis[0].data.push(item.dataStatisticsDate);
          })
          formatData.map((item, index) => {
            this.lineOption.series[index].data = item;
          })
        }
      }).catch((errorRes) => {

      })
    },
    searchConfirm(v) {
      console.log('vvvv', v)
      this.searchDate.startDate = v.startDate;
      this.searchDate.endDate = v.endDate;
      this.getLineList();
      this.getBaseDate();
    },
    formatJson(filterVal, jsonData) {
      return filterVal.map(v => jsonData.map(j => {
        return j[v]
      }))
    },
  }
}
</script>
<style scoped>
  .echartsBox > /deep/ .ivu-row {
    margin-right: -32px!important;
  }
</style>
<style lang="less" scoped>
.selectBox {
  padding: 17px 20px;
  background-color: #fff;
  box-shadow: 5px 6px 5px 0px rgba(12, 1, 4, 0.4);
}
.echartsBox {
  margin-top: 25px;
  .leftEcharts {
    padding: 15px;
    background-color: #fff;
    box-shadow: 5px 6px 5px 0px rgba(12, 1, 4, 0.4);
  }
  .rightBox {
    padding: 0 15px;
    /*background-color: #fff;*/
    /*box-shadow: 5px 6px 5px 0px rgba(12, 1, 4, 0.4);*/
    .topBox {
      height: 195px;
      position: relative;
      /deep/ .ivu-card-shadow {
        box-shadow: 5px 6px 5px 0px rgba(12, 1, 4, 0.4);
        .ivu-card-body {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 163px;
        }
      }
      .hrBox {
        background-color: rgb(153, 153, 153);
        height: 2px;
        position: absolute;
        top: 115px;
        z-index: 99;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
      }
      h3 {
        font-size: 22px;
        margin-top: 35px;
        white-space: nowrap;
      }
      /*padding: 15px;*/
      /*background-color: #fff;*/
    }
    .rightEcharts {
      margin-top: 25px;
      padding: 15px;
      background-color: #fff;
      box-shadow: 5px 6px 5px 0px rgba(12, 1, 4, 0.4);
    }
  }
}
</style>