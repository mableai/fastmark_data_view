<template>
  <div class="contentBox">
    <div style="background-color: #fff;padding: 30px 20px 30px 20px;box-shadow: 5px 6px 5px 0px rgba(12, 1, 4, 0.4);" v-if="!detailModal">
      <div id="myChart" :style="{width: '100%', height: '640px'}" ref="myChart" v-if="!detailModal"></div>
      <div class="tips">
        <span style="font-size: 12px;color: #818181;">该数据每小时更新一次</span>
        <h1 style="font-size: 22px;color: #787878">注：头像越大，则表明该名用户价值越高</h1>
      </div>
    </div>
    <!--  用户详情页面  -->
    <div v-if="detailModal">
      <div style="display: flex;justify-content: space-between;">
        <div class="detailBox">
          <Card title="旗下用户" icon="ios-options" :padding="0" shadow style="width: 192px;">
            <CellGroup @on-click="cardClick">
              <template v-for="(item) in detailUser">
                <Cell :title="item.nickname" :name="item.name" :selected="cellSelected === item.name" />
              </template>
            </CellGroup>
          </Card>
        </div>
        <div style="width: 100%;margin-left: 19px;background-color: #FFFFFF;">
          <div style="display: flex;justify-content: space-between">
            <div style="flex: 1;">
              <h1 style="font-size: 18px;font-weight: bold;color: #333333;margin-bottom: 38px;margin-left: 28px;margin-top: 22px;">微信传播路径展示</h1>
              <div style="margin: 10px 0 20px 18px;cursor:pointer;" class="callBack" title="返回上一级" @click="callBackBtn">
                <Icon type="ios-arrow-back" style="font-size: 35px;"/>
              </div>
              <common-echart height="640px" :option="graphOption"/>
              <span style="font-size: 12px;color: #818181;text-align: right;display: inherit;margin: 15px 10px;">该数据每小时更新一次</span>
            </div>
            <div style="width: 452px;" class="userData">
              <Card style="max-width: 452px;margin: 0 auto;" :bordered="false" :shadow="false">
                <p slot="title">用户数据</p>
                <div class="avatarBox">
                  <Avatar :src="wxAvatar" size="large"/>
                  <p style="margin: 10px 0;">{{ nickName }}</p>
                </div>
                <Form :label-width="80"  style="height: 620px;overflow-y: auto;">
                  <template v-for="(item, index) in userData">
                    <FormItem :label="item.key">
                      {{ item.value }}
                    </FormItem>
                  </template>
                  <FormItem label="操作记录">
                    <Form :label-width="80" label-position="left">
                      <template v-for="(item, index) in actionLogList">
                        <FormItem :label="item.actionNote">
                          <span>{{ item.date }}</span>
                          <span style="margin-left:20px;">{{ item.time }}</span>
                        </FormItem>
                      </template>
                      <template v-if="actionLogList.length === 0">
                        <span>暂无记录</span>
                      </template>
                    </Form>
                  </FormItem>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
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
          tooltip: {
            show: false
          },
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
                  curveness: 0,
                  color: '#841c33'
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
                curveness: 0,
                color: '#841c33'
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
        userDatailTimer: null,//用户详情页面的定时器
        detailUser: [],
        cellSelected: "",
        memberId: '',//被点击的用户id
      }
    },
    computed: {
      ...mapGetters([
        'activityStartDate',
        'businessList',
        'activityId'
      ]),
    },
    watch: {
      // businessList(newValue) {
      //   console.log('businessList----', newValue)
      //   if(newValue.length > 0) {
      //     this.getShareList()
      //   }
      // },
      businessList: {
        handler(newValue, oldValue) {
          console.log('监听传播分析页面的businessList----', newValue)
          if(newValue.length > 0) {
            this.getShareList()
          }
        },
        deep: true, //深度监听
        immediate: true
      },
    },
    created() {
      //this.pubdata()
    },
    mounted() {
      this.timer = setInterval(() => {
        this.getShareList()
      }, 1000 * 60 * 60)
      this.echartInit()
    },
    destroyed() {
      //console.log('被销毁后')
      //清除定时器
      clearInterval(this.timer)
    },
    methods: {
      cardClick(name) {
        console.log('name', name)
        this.cellSelected = name;
        this.memberId = name;
        this.getShareDetail(this.memberId, true);
      },
      getShareList() {
        //console.log('商户ID=======', this.businessList)
        let params = {
          "activityId": this.activityId,
          "businessList": this.businessList,
        }
        shareList(params).then(res => {
          if (res) {
            res.body.shareMemberList.map((item, index) => {
              item.value = parseFloat(toFixedNumber(Number(item.value), 2));
            })
            this.data = this.formatterData(res.body.shareMemberList);
            this.links = res.body.shareGrapList;
            if (this.data.length > 0) {
              this.drawBar();
            }
          }
        }).catch((errorRes) => {
          console.log('errorRes', errorRes)
        })
      },
      getShareDetail(memberId, bool) {
        let params = {
          "activityId": this.activityId,
          "businessList": this.businessList,
          "params": { "memberId": memberId}
        }
        shareDetail(params).then(res => {
          if (res) {
            res.body.shareMemberList.map((item, index) => {
              item.value = parseFloat(toFixedNumber(Number(item.value), 2));
              //公式
              item.symbolSize = 50 + (item.value * 4);
              if (item.symbolSize >= 150) {
                item.symbolSize = 150;
              }
            })
            this.graphOption.series[0].data = this.detailPubData(res.body.shareMemberList);
            this.graphOption.series[0].links = res.body.shareGrapList;
            this.userData = [];
            if (res.body.submitList && res.body.submitList.length > 0) {
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
              item.time = timestampToTime(new Date("" + item.createTime).getTime())
              item.date = timestampToDate(new Date("" + item.createTime).getTime())
            })
            this.actionLogList = res.body.actionLogList
            this.nickName = res.body.nickname;
            this.wxAvatar = res.body.headimageurl;
            //点击的是旗下用户的时候，不重新赋值覆盖用户列表了
            if (!bool) {
              this.detailUser = this.graphOption.series[0].data;
              this.cellSelected = memberId;
            }
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
      drawBar(bool) {
        // 基于准备好的dom，初始化echarts实例
        //let myChart2 = this.$echarts.init(document.getElementById('myChart'))
        if (this.$refs.myChart) {
          console.log('画图表了')
          if(this.chart) {
            this.$echarts.dispose(this.chart);
          }
          this.chart = this.$echarts.init(this.$refs.myChart);
          if (this.echartSeries[0].data.length > 0 && bool) {
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
              this.memberId = params.data.name;
              this.getShareDetail(this.memberId);
              this.userDatailTimer = setInterval(() => {
                this.getShareDetail(this.memberId, true)
              }, 1000 * 60 * 60)
              console.log('this.detailModal', this.detailModal)
            })
          } else {
            this.pubdata(this.data);
          }
        }
      },
      callBackBtn() {
        this.detailModal = false;
        clearInterval(this.userDatailTimer)
        this.$nextTick(() => {
          this.drawBar(true);
        })
      },
      detailPubData(json) {
        var androidMap = json;

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
            //console.log(img);
            androidMap[i].symbol = img;
          }
          //console.log('androidMap详情', androidMap)
        })
        console.log('androidMap详情', androidMap)
        return androidMap
      },
      pubdata(json) {
        console.log('执行了pubdata方法')
        // var androidMap = JSON.parse(json);
        //var androidMap = this.echartSeries[0].data;
        // var androidMap = this.data;
        var androidMap = json;

        var picList = [];
        const that = this;
        console.log('that----', that)
        for (var i = 0; i < androidMap.length; i++) {
          var object = androidMap[i];
          var http = androidMap[i].symbol;

          let p = this.getImgData(androidMap[i].symbol);

          picList.push(p);
        }
        Promise.all(picList).then(function (images) {
          for (var i = 0; i < images.length; i++) {
            var img = "image://" + images[i];
            //console.log(img);
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

          // myChart.setOption({
          //   series: [{
          //     data: androidMap
          //   }]
          // })
        })
        that.chart.on('click', function (params) {
          console.log('params', params.data.name)
          that.detailModal = true;
          that.memberId = params.data.name;
          that.getShareDetail(that.memberId);
          that.userDatailTimer = setInterval(() => {
            that.getShareDetail(that.memberId, true)
          }, 1000 * 60 * 60)
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
      // 关系图圆圈的大小
      formatterData(data) {
        data.map((item, index) => {
          // value范围 [0, 50]
          // symbolSize范围 [50, 150]
          //公式
          item.symbolSize = 50 + (item.value * 4);
          if (item.symbolSize >= 150) {
            item.symbolSize = 150;
          }
        })
        return data;
      }
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
      background-color: #298df0;
      .ivu-card-head {
        border-bottom: none;
        p {
          color: #fff;
        }
      }
      .ivu-card-body {
        height: (816px - 50px);
        overflow-y: auto;
        .ivu-cell-selected {
          color: #2d8cf0;
          background-color: #0b72d4;
        }
        .ivu-cell-selected:hover {
          color: #2d8cf0;
        }
        .ivu-cell {
          &:hover {
            background-color: #0b72d4;
          }
          .ivu-cell-item {
            text-align: center;
            color: #fff;
          }
        }

      }
    }
  }

  .userData {
    /deep/ .ivu-card {
      height: 100%;
      overflow-y: auto;
      background-color: #fff;
      .ivu-card-head {
        border-bottom: none;
        p {
          font-size: 16px;
          color: #333333;
        }
      }
      .ivu-card-body {
        padding-right: 0;
      }
      &:hover {
        box-shadow: none;
      }
    }
    .avatarBox {
      text-align: center;
      .ivu-avatar-large {
        width: 80px;
        height: 80px;
        line-height: 80px;
        border-radius: 100%;
      }
    }
  }
</style>