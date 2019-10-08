<template>
  <div class="contentBox">
    <div style="background-color: #fff;padding: 30px 20px 30px 20px;box-shadow: 5px 6px 5px 0px rgba(12, 1, 4, 0.4);">
      <div id="myChart" :style="{width: '100%', height: '640px'}" ref="myChart" v-if="!detailModal"></div>
      <div v-if="detailModal">
        <h1 style="font-size: 18px;font-weight: bold;color: #333333;margin-bottom: 20px;">微信传播路径展示</h1>
        <div style="display: flex;justify-content: space-between">
          <div style="flex: 0.7;">
            <div style="margin: 10px 0 20px 0;cursor:pointer;" class="callBack" title="返回上一级" @click="callBackBtn">
              <Icon type="ios-arrow-back" style="font-size: 35px;"/>
            </div>
            <div style="display: flex;justify-content: space-between">
              <div class="detailBox">
                <Card title="旗下用户" icon="ios-options" :padding="0" shadow style="width: 200px;">
                  <CellGroup>
                    <Cell title="Only show titles"/>
                    <Cell title="Only show titles111"/>
                    <Cell title="Only show titles222"/>
                    <Cell title="Selected" selected/>
                  </CellGroup>
                </Card>
              </div>
              <div style="flex: 1">
                <common-echart height="400px" :option="graphOption"/>
              </div>
            </div>
          </div>
          <div style="width: 300px;flex: 0.3;" class="userData">
            <Card style="max-width: 410px;margin: 0 auto;">
              <p slot="title">用户数据：</p>
              <Form :label-width="80">
                <FormItem label="微信头像">
                  <Avatar :src="wxAvatar"/>
                </FormItem>
                <FormItem label="微信昵称">
                  {{ nickName }}
                  <!--<span style="display: inline-block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 400px;">未来可期。</span>-->
                </FormItem>
                <template v-for="(item, index) in userData">
                  <FormItem :label="item.key">
                    {{ item.value }}
                  </FormItem>
                </template>

                <FormItem label="操作记录">
                  <Form :label-width="80" label-position="left" style="height: 25vh;overflow-y: auto;">
                    <template v-for="(item, index) in actionLogList">
                      <FormItem :label="item.actionNote">
                        <span>{{ item.date }}</span>
                        <span style="margin-left:20px;">{{ item.time }}</span>
                      </FormItem>
                    </template>
                  </Form>
                </FormItem>
              </Form>
            </Card>
          </div>
        </div>
      </div>
      <div class="tips">
        <span style="font-size: 12px;color: #818181;">该数据每小时更新一次 {{ detailModal }}</span>
        <h1 style="font-size: 22px;color: #787878" v-show="!detailModal">注：头像越大，则表明该名用户价值越高</h1>
      </div>
    </div>
  </div>
</template>
<script>
  import commonEchart from "@/components/echarts/commonechart"
  import { shareList, shareDetail } from "@/api/example/index"
  import { timestampToDate, timestampToTime, toFixedNumber, deepClone } from '@/utils'
  export default {
    name: "communicationAnalysis",
    components: {
      commonEchart
    },
    data() {
      return {
        graphOption: {
          title: {
            text: ''
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              type: 'graph',
              layout: 'force',
              force: {
                repulsion: 1000,
                edgeLength: 140
              },
              symbolSize: 50,
              roam: true,
              label: {
                normal: {
                  show: true,
                  position: 'bottom',
                  color: '#666',
                  //formatter: '{b}\n{c}',
                  formatter: function (params) {
                    return (params.data.nickname + '\n（' + params.data.value + '）');
                  },
                }
              },
              edgeSymbol: ['none', 'arrow'],
              edgeLabel: {
                normal: {
                  textStyle: {
                    fontSize: 20
                  }
                }
              },
              data: [],
              links: [],
              lineStyle: {
                normal: {
                  opacity: 1,
                  width: 2,
                  curveness: 0
                }
              }
            }
          ]
        },
        // data: [
        //   {
        //     name: '校园大数据',
        //     symbol: 'http://thirdwx.qlogo.cn/mmopen/vi_32/lVzYeVLNHnM8ibfuT6pFFbW5xLLbNkbOLgNPib6C27Lbt0UpvEvlibv9uTGqib5xIACzFukV3S6HCWxCd9h38V6Cibg/132',
        //     symbolSize: 120,
        //     value: 140,
        //     nickname: 'Omen',
        //   },
        //   {
        //     name: '舆情大数据',
        //     symbol: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoPGAeBZ2WBYCBISg8FEynxFTYR62SrpFmkTzTMYXLzOG9GIZb9LLTGvPQGXX6dPiaJ9jstax5IDLw/132',
        //     value: 120,
        //     nickname: 'Omen2',
        //     //symbolSize: 100,
        //   },
        //   {
        //     name: '用户分析',
        //     symbol: 'https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/dazhuanpan/turntable4/images/index.png',
        //     value: 80,
        //     symbolSize: 80,
        //     nickname: 'Ome3',
        //
        //   },
        //   {
        //     name: '话题分析',
        //     symbol: 'https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/dazhuanpan/turntable4/images/index.png',
        //     value: 80,
        //     symbolSize: 80,
        //     nickname: 'Omen4',
        //   },
        //   {
        //     name: '评论分析',
        //     symbol: 'https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/dazhuanpan/turntable4/images/index.png',
        //     value: 100,
        //     symbolSize: 100,
        //     nickname: 'Omen5',
        //   },
        //   {
        //     name: '图书馆分析',
        //     symbol: 'https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/dazhuanpan/turntable4/images/index.png',
        //     value: 80,
        //     nickname: 'Omen6',
        //     //symbolSize:100,
        //
        //   },
        //   {
        //     name: '借阅分析',
        //     symbol: 'https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/dazhuanpan/turntable4/images/index.png',
        //     value: 80,
        //     symbolSize: 80,
        //     nickname: 'Omen11',
        //
        //   },
        //   {
        //     name: '借阅排行',
        //     symbol: 'https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/dazhuanpan/turntable4/images/index.png',
        //     value: 80,
        //     symbolSize: 80,
        //     nickname: 'Omen7',
        //
        //   },
        //   {
        //     name: '图书收录',
        //     symbol: 'https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/dazhuanpan/turntable4/images/index.png',
        //     value: 90,
        //     symbolSize: 90,
        //     nickname: 'Omen8',
        //   },
        //   {
        //     name: '图书分析',
        //     symbol: 'https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/dazhuanpan/turntable4/images/index.png',
        //     value: 70,
        //     symbolSize: 70,
        //     nickname: 'Omen9',
        //
        //   }, {
        //     name: '大猫一号',
        //     symbol: 'https://fastmarket.oss-cn-shenzhen.aliyuncs.com/oss/static/dazhuanpan/turntable4/images/index.png',
        //     value: 70,
        //     symbolSize: 70,
        //     nickname: 'Omen10',
        //
        //   }
        // ],
        // links: [
        //   {
        //     source: '校园大数据',
        //     target: '大猫一号'
        //   },
        //   {
        //     source: '校园大数据',
        //     target: '图书馆分析',
        //   },
        //   {
        //     source: '舆情大数据',
        //     target: '用户分析',
        //   },
        //   {
        //     source: '舆情大数据',
        //     target: '话题分析',
        //   },
        //   {
        //     source: '舆情大数据',
        //     target: '评论分析',
        //   },
        //   {
        //     source: '校园大数据',
        //     target: '图书馆分析',
        //   },
        //   {
        //     source: '图书馆分析',
        //     target: '图书分析',
        //   },
        //   {
        //     source: '图书馆分析',
        //     target: '借阅分析',
        //   },
        //   {
        //     source: '图书馆分析',
        //     target: '借阅排行',
        //
        //   }, {
        //     source: '图书馆分析',
        //     target: '图书收录'
        //
        //   }
        // ],
        data: [],
        links: [],
        echartSeries: [
          {
            type: 'graph',
            layout: 'force',
            force: {
              repulsion: 1000,
              edgeLength: 240
            },
            symbolSize: 50,
            roam: true,
            label: {
              normal: {
                show: true,
                position: 'bottom',
                color: '#666',
                //formatter: '{b}\n{c}',
                formatter: function (params) {
                  return (params.data.nickname + '\n（' + params.data.value + '）');
                },
              }
            },
            edgeSymbol: ['none', 'arrow'],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 20
                }
              }
            },
            lineStyle: {
              normal: {
                opacity: 1,
                width: 2,
                curveness: 0
              }
            },
            data: [],
            links: [],
          }
        ],
        chart: null,
        detailModal: false,
        userData: [],
        actionLogList: [],
        wxAvatar: '',//微信头像
        nickName: '',//微信昵称
        timer: null,//定时器,
      }
    },
    created() {
      //this.pubdata()
    },
    mounted() {
      this.getShareList()
      this.timer = setInterval(() => {
        this.getShareList()
      }, 1000 * 60 * 60)
      this.echartInit()
    },
    destroyed() {
      console.log('被销毁后')
      //清除定时器
      clearInterval(this.timer)
    },
    methods: {
      getShareList() {
        let params = {
          "activityId": 104383,
          "businessList": [
            173,199
          ],
        }
        shareList(params).then(res => {
          if (res) {
            this.data = res.body.shareMemberList;
            this.links = res.body.shareGrapList;
            this.drawBar();
          }
        }).catch((errorRes) => {
          console.log('errorRes', errorRes)
        })
      },
      getShareDetail(memberId) {
        let params = {
          "activityId": 104383,
          "businessList": [
            173,199
          ],
          "params": { "memberId": memberId}
        }
        shareDetail(params).then(res => {
          if (res) {
            res.body.shareMemberList.map((item, index) => {
              item.value = parseFloat(toFixedNumber(Number(item.value), 2))
            })
            this.graphOption.series[0].data = res.body.shareMemberList;
            this.graphOption.series[0].links = res.body.shareGrapList;
            if (res.body.submitList && res.body.submitList.length > 1) {
              res.body.submitList.map((item, index) => {
                  Object.keys(item).map((key) => {
                    this.userData.push({
                      key: key,
                      value: item[key]
                    })
                  })
              })
            }
            res.body.actionLogList.map((item, index) => {
              item.time = timestampToDate(new Date("" + item.createTime).getTime())
              item.date = timestampToTime(new Date("" + item.createTime).getTime())
            })
            this.actionLogList = res.body.actionLogList
            this.nickName = res.body.nickname;
            this.wxAvatar = res.body.headimageurl;
            console.log('this.userData', this.userData)
          }
        }).catch((errorRes) => {
          console.log('errorRes', errorRes)
        })
      },
      echartInit() {
        const self = this
        setTimeout(() => {
          window.onresize = function () {
            if (self.$refs.myChart) {
              self.chart = self.$echarts.init(self.$refs.myChart)
              self.chart.resize()
            }
          }
        }, 20)
      },
      // 画图表
      drawBar() {
        // 基于准备好的dom，初始化echarts实例
        //let myChart2 = this.$echarts.init(document.getElementById('myChart'))
        if (this.$refs.myChart) {
          console.log('画图表了')
          this.chart = this.$echarts.init(this.$refs.myChart);
          if (this.echartSeries[0].data.length > 0) {
            // 绘制图表
            console.log('走了---if')
            this.chart.setOption({
              title: {
                text: '微信传播路径展示'
              },
              tooltip: {
                show: false,
                formatter: function (params) {
                  //console.log('formatter', params)
                  return (params.data.nickname + '\n（' + params.data.value + '）');
                },
              },
              animationDurationUpdate: 1500,
              animationEasingUpdate: 'quinticInOut',
              series: this.echartSeries
            })
            this.chart.on('click', (params) => {
              console.log('params', params.data.name)
              this.detailModal = true;
              this.getShareDetail(params.data.name);
              console.log('this.detailModal', this.detailModal)
            })
          } else {
            this.pubdata();
          }
        }
      },
      callBackBtn() {
        this.detailModal = false;
        this.$nextTick(() => {
          this.drawBar();
        })
      },
      pubdata(json) {
        console.log('执行了pubdata方法')
        // var androidMap = JSON.parse(json);
        //var androidMap = this.echartSeries[0].data;
        var androidMap = this.data;

        var picList = [];
        const that = this;
        for (var i = 0; i < androidMap.length; i++) {
          var object = androidMap[i];
          var http = androidMap[i].symbol;

          let p = this.getImgData(androidMap[i].symbol);

          picList.push(p);
        }
        Promise.all(picList).then(function (images) {
          for (var i = 0; i < images.length; i++) {
            var img = "image://" + images[i];
            console.log(img);
            androidMap[i].symbol = img;
          }
          console.log('androidMap', androidMap)
          that.echartSeries[0].data = that.data;
          that.echartSeries[0].links = that.links;

          // 绘制图表
          that.chart.setOption({
            title: {
              text: '微信传播路径展示'
            },
            tooltip: {
              show: false,
              formatter: function (params) {
                console.log('formatter', params)
                return (params.data.nickname + '\n（' + params.data.value + '）');
              },
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: that.echartSeries
          })
          that.chart.on('click', function (params) {
            console.log('params', params.data.name)
            that.detailModal = true;
            that.getShareDetail(params.data.name);
          })
          // myChart.setOption({
          //   series: [{
          //     data: androidMap
          //   }]
          // })
        })

      },
      getImgData(imgSrc) {
        var fun = function (resolve) {
          const canvas = document.createElement('canvas');
          const contex = canvas.getContext('2d');
          const img = new Image();
          img.crossOrigin = '';

          img.onload = function () {
            var center = {
              x: img.width / 2,
              y: img.height / 2
            }
            var diameter = img.width;
            canvas.width = diameter;
            canvas.height = diameter;
            contex.clearRect(0, 0, diameter, diameter);
            contex.save();
            contex.beginPath();
            var radius = img.width / 2;
            contex.arc(radius, radius, radius, 0, 2 * Math.PI); //画出圆
            contex.clip(); //裁剪上面的圆形
            contex.drawImage(img, center.x - radius, center.y - radius, diameter, diameter, 0, 0,
                diameter, diameter); // 在刚刚裁剪的园上画图
            contex.restore(); // 还原状态
            resolve(canvas.toDataURL('image/png', 1))
          }
          img.src = imgSrc;
        }
        var promise = new Promise(fun);
        return promise
      },
    }
  }
</script>
<style lang="less" scoped>
  .tips {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .detailBox {
    /deep/ .ivu-card {
      background-color: #f8f8f9;

      .ivu-card-body {
        height: 49vh;
        overflow-y: auto;
      }
    }
  }

  .userData {
    /deep/ .ivu-card {
      height: 100%;
      overflow-y: auto;
      background-color: #f8f8f9;
    }
  }
</style>