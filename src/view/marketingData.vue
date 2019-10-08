<template>
  <div class="contentBox">
    <!-- <header class="header">
      <Form class="form" :model="formItem">
        <Row>
          <Col span="3">
            <FormItem class="formItem">
              <Select v-model="formItem.timeQuantum" style="width:100px">
                <Option v-for="item in formItem.timeQuantumList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem class="formItem" label="发送时间：">
              <Row>
                <Col span="7">
                  <FormItem prop="datetime">
                    <DatePicker type="datetime" placeholder="选择开始时间" @on-change="onStartTime" v-model="formItem.time.startTime"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="1" style="text-align: center">-</Col>
                <Col span="7">
                  <FormItem prop="datetime">
                    <DatePicker type="datetime" placeholder="选择结束时间" @on-change="onEndTime" v-model="formItem.time.endTime"></DatePicker>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
          </Col>
          <Col span="2" >
            <Button type="primary" @click="searchBtn" >查询</Button>
          </Col>
        </Row>
      </Form>
    </header> -->
    <date-time @search="searchConfirm" :defaultDate="defaultDate"></date-time>
    <div class="content">
      <Row>
        <Col span="10">
          <div class="noteDataFunnel">
            <common-echart :option="funnelOption" height="600px"></common-echart>
          </div>
        </Col>
        <Col span="1" style="height:600px;">
          
        </Col>
        <Col span="13">
          <div id="smsSendingArea" class="smsSendingArea" ref="smsSendingArea"> 
            <common-echart :option="options" height="600px"></common-echart>
          </div>
        </Col>
      </Row>
      <Table class="marketing-table" border :columns="tableHeader" :data="historyData"></Table>
      <Page class="paging" :total=total :pageSize=pageSize @on-change="changepage" show-elevator show-sizer show-total />
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import commonEchart from "@/components/echarts/commonechart";
import "../../node_modules/echarts/map/js/china.js";
import "../../node_modules/echarts/theme/macarons.js";
import { postmarkeingToal, postmarkeingSpread, gettmarkeingsmsrecord} from '@/api/example';
import { getNowDate, toFixedNumber } from '@/utils';
import dateTime from "@/components/datePicker/dateTime";
export default {
  name: "marketingData",
  components: {
    commonEchart,
     dateTime  
  },
  data() {
    return {
  
      defaultDate:[],
      formItem: {
        time: {
          startTime: "",
          endTime: ""
        },
        timeQuantum: "至今",
        timeQuantumList: [
          {
            value: "至今",
            label: "至今"
          },
          {
            value: "当天",
            label: "当天"
          },
          {
            value: "昨天",
            label: "昨天"
          }
        ]
      },
      tableHeader: [
        {
          title:"序号",
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          width: 120
        },
        {
          title: '短信内容',
          key: 'message'
        },
        {
          title: '短信长度',
          key: 'smsLength',
          width: 90
        },
        {
          title: '分段',
          key: 'subsection',
          width: 70
        },
        {
          title: '提交时间',
          key: 'submitTime',
          width: 150
        },
        {
          title: '状态',
          key: 'state',
          width: 90
        },
        {
          title: '发送时间(原状态返回时间)',
          key: 'sendTime',
          width: 180
        },
        {
          title: '是否点击活动链接',
          key: 'isClick',
          width: 90
        }
      ],
      historyData:[],
      tableData: [
        {
          phone: "A",
          message: "阿东方大道",
          smsLength: 5,
          subsection: 1,
          submitTime: "2019.09.26 19:00:01",
          state: '成功',
          sendTime: "2019-09-26 15:58:41",
          isClick: '是',
        },
        {
          phone: "15212345678",
          message: "恩爱的发个",
          smsLength: 8,
          subsection: 1,
          submitTime: "2019.09.26 19:00:01",
          state: '失败',
          sendTime: "2019-09-26 15:58:41",
          isClick: '否',
        },
        {
          phone:"B",
          message: "较高的方便的",
          smsLength: 2,
          subsection: 1,
          submitTime: "2019.09.26 19:00:01",
          state: '成功',
          sendTime: "2019-09-26 15:58:41",
          isClick: '是',
        },
        {
          phone:"C",
          message: "如何把刚恢复到",
          smsLength: 18,
          subsection: 1,
          submitTime: "2019.09.26 19:00:01",
          state: '失败',
          sendTime: "2019-09-26 15:58:41",
          isClick: '是',
        },
        {
          phone:"D",
          message: "如何把刚恢复到",
          smsLength: 18,
          subsection: 1,
          submitTime: "2019.09.26 19:00:01",
          state: '失败',
          sendTime: "2019-09-26 15:58:41",
          isClick: '是',
        },
        {
          phone:"E",
          message: "如何把刚恢复到",
          smsLength: 18,
          subsection: 1,
          submitTime: "2019.09.26 19:00:01",
          state: '失败',
          sendTime: "2019-09-26 15:58:41",
          isClick: '是',
        },
        {
          phone:"F",
          message: "如何把刚恢复到",
          smsLength: 18,
          subsection: 1,
          submitTime: "2019.09.26 19:00:01",
          state: '失败',
          sendTime: "2019-09-26 15:58:41",
          isClick: '是',
        },
        {
          phone:"G",
          message: "如何把刚恢复到",
          smsLength: 18,
          subsection: 1,
          submitTime: "2019.09.26 19:00:01",
          state: '失败',
          sendTime: "2019-09-26 15:58:41",
          isClick: '是',
        }
      ],
      ajaxHistoryData:[],
      total:0,
      pageSize:2,
      myChart: null,
      funnelOption: {},
      options: {},
       linkSendAmount:'',//链接点击量
      smsSuccessAmount:'',//短信触达量
      smsSendAmount: '',//短信发送量
      searchDate: {
        "startDate": "",
        "endDate":getNowDate()
      },
    }
  },
  created() {
         // 默认时间取活动开始时间，和当前时间
    this.searchDate.startDate = "2019-09-25";
     this.defaultDate[0] = this.searchDate.startDate;
    this.defaultDate[1] = this.searchDate.endDate;
    this.handleListApproveHistory();
  },
  mounted(){
    this.$nextTick(()=>{
      this.smsDataFunnel();
      this.optionData();
        this.getMarkeingDate();
    })
    console.log(echarts);
  },
  methods:{
    randomData() {
      return Math.round(Math.random()*2500);
    },
    optionData() {
      this.options = {
        title: {
          text: "短信分发区域",
          textStyle: {
            fontSize: 16
          },
          top: "8",
          left: "15"
        },
        tooltip: {
            trigger: "item",
          // formatter: "{a} <br/>{b}: {c} ({d}%)";
          formatter:(params=>{
            console.log("省份tooltip",params);
               console.log("省份value",params.value);
                if(params.value == 'NaN'){
                   console.log(params.value == 'NaN');
                   params.value = "0"
                }

            // return  params.seriesName +" : "+ params.value + '<br>'+"%";
             return  params.seriesName +" : "+ '<br/>'+ params.name + '<br>' +  params.value + "%";
          })
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data:['总投资额']
        // },
        visualMap: {
          min: 0,
          max: 10,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true
        },
        toolbox: {
          show: false,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "该区域链接点击量转化率",
            type: "map",
            mapType: "china",
            roam: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: "北京", value: this.randomData() },
              { name: "天津", value: this.randomData() },
              { name: "上海", value: this.randomData() },
              { name: "重庆", value: this.randomData() },
              { name: "河北", value: this.randomData() },
              { name: "河南", value: this.randomData() },
              { name: "云南", value: this.randomData() },
              { name: "辽宁", value: this.randomData() },
              { name: "黑龙江", value: this.randomData() },
              { name: "湖南", value: this.randomData() },
              { name: "安徽", value: this.randomData() },
              { name: "山东", value: this.randomData() },
              { name: "新疆", value: this.randomData() },
              { name: "江苏", value: this.randomData() },
              { name: "浙江", value: this.randomData() },
              { name: "江西", value: this.randomData() },
              { name: "湖北", value: this.randomData() },
              { name: "广西", value: this.randomData() },
              { name: "甘肃", value: this.randomData() },
              { name: "山西", value: this.randomData() },
              { name: "内蒙古", value: this.randomData() },
              { name: "陕西", value: this.randomData() },
              { name: "吉林", value: this.randomData() },
              { name: "福建", value: this.randomData() },
              { name: "贵州", value: this.randomData() },
              { name: "广东", value: this.randomData() },
              { name: "青海", value: this.randomData() },
              { name: "西藏", value: this.randomData() },
              { name: "四川", value: this.randomData() },
              { name: "宁夏", value: this.randomData() },
              { name: "海南", value: this.randomData() },
              { name: "台湾", value: this.randomData() },
              { name: "香港", value: this.randomData() },
              { name: "澳门", value: this.randomData() }
            ]
          }
        ]
      }
    },
    smsDataFunnel() {
      this.funnelOption = {
        title: {					// 图表标题
          text: '短信数据漏斗',					// 标题文本内容
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
          "top": "bottom",
          "left": "00%",
          "textStyle": {
            "color": "#000"
          },
          "data":  ['短信发送量', '短信触达量', '链接点击量'],
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
        color: ['#aeaeae', '#949494', '#6b6b6b'],
        series: [
          {
            x: '-40%',
            name: '',
            type: 'funnel',
            //left: '10%',
            width: '80%',
            gap: 10,
            minSize: 100,
            maxSize: 500,
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
                length:	120,		// 视觉引导线第一段的长度。
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
            data: [
              {value: 10, name: '短信发送量'},
              {value: 20, name: '短信触达量'},
              {value: 30, name: '链接点击量'}
            ].sort(function (a, b) { return a.value - b.value}),
          },
          {
            name: '',
            type: 'funnel',
            gap: 10,
            x: '-72%',
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
            data: [
              {value: 1200, name: '短信发送量'},
              {value: 400, name: '短信触达量'},
              {value: 200, name: '链接点击量'}
            ].sort(function (a, b) { return a.value - b.value}),
          }
        ]
      }
    },

    //需要统计的数据类型(统计数据的类型(1浏览量pv，2浏览人数uv，3分享人数，4、短信触达量，5中奖量，6领奖量，7分享量，8短信发送量，9短信链接点击量，10参与量))
     getMarkeingDate() {
      let needDataTypeSet = [4,8,9];
      this.searchDate.needDataTypeSet = needDataTypeSet;
      let params = {
        "activityId": 104383,
        "businessList": [
          173,199
        ],
        "params": this.searchDate,
      }
       console.log(params);
      postmarkeingToal(params).then(res => {
       console.log('res', res);
       if (res) {

        this.funnelOption = {
              title: {					// 图表标题
                text: '短信数据漏斗',					// 标题文本内容
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
                "top": "bottom",
                "left": "00%",
                "textStyle": {
                  "color": "#000"
                },
                "data":  ['短信发送量', '短信触达量', '链接点击量'],
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
              color: ['#aeaeae', '#949494', '#6b6b6b'],
              series: [
                {
                  x: '-40%',
                  name: '',
                  type: 'funnel',
                  //left: '10%',
                  width: '80%',
                  gap: 10,
                  minSize: 100,
                  maxSize: 500,
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
                      length:	120,		// 视觉引导线第一段的长度。
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
                  data: [
                    {value:res.body['8'], name: '短信发送量'},
                    {value: res.body['4'], name: '短信触达量'},
                    {value:  res.body['9'], name: '链接点击量'}
                  ].sort(function (a, b) { return a.value - b.value}),
                },
                {
                  name: '',
                  type: 'funnel',
                  gap: 10,
                  x: '-72%',
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
                  data: [
                    {value:res.body['8'], name: '短信发送量'},
                    {value: res.body['4'], name: '短信触达量'},
                    {value:  res.body['9'], name: '链接点击量'}
                  ].sort(function (a, b) { return a.value - b.value}),
                }
              ]
            }

          // linkSendAmount:'',//链接点击量
         // smsSuccessAmount:'',//短信触达量
         // smsSendAmount: '',//短信发送量
          this.smsSuccessAmount = res.body['4'];//短信触达量
          this.smsSendAmount = res.body['8'];//短信发送量
          this.linkSendAmount = res.body['9'];//链接点击量
        }

      }).catch((errorRes) => {

      });
      
      let paramss = {
          "activityId": 104246,
          "businessList": [
              199,
              245
          ],
          "params": {
              "startDate": "2017-11-22",
              "endDate": "2019-09-30"
          }  
      };
    

      postmarkeingSpread(paramss).then(res => { 
           console.log("短信分布区域",res);
           
             let provinceList = res.body;
               provinceList.map((v,keys) =>{
                //  Object.keys(v)[0] == "name"
                //    console.log(Object.keys(v)[0]);
                  //  console.log("keys",keys);
                  v.name =  v.province
                  v.value  =  v.urlClickAmount/v.smsSendSuccessAmount
                  delete  v.urlClickAmount;
                  delete  v.smsSendSuccessAmount;
                  return v;
               })
                   console.log("新的省份数组",provinceList);
                // console.log(this.options.series[0].data);
               this.options.series[0].data =  provinceList
                
                //  console.log("新的省份数组",provinceList);
                  // console.log("this.options",this.options);
      }).catch((errorRes)=>{

      })
    },
    //  postmarkeingToal(params).then(res => {
     //获取当前日期
    getNowDate() {
     
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          if (month < 10) {
            month = "0" + month;
          }
          if (day < 10) {
            day = "0" + day;
          }
          var nowDate = year + "-" + month + "-" + day;
          return year + "-" + month + "-" + day;
    },
    //查询短信发送记录
   searchConfirm(v) {
      console.log('vvvv', v)
      this.searchDate.startDate = v.startDate;
      this.searchDate.endDate = v.endDate;
      // this.getLineList();
      // this.getBaseDate();
        let params = {
          "sendStartDate":'2019-10-01',
          "sendEndDate":'2019-10-08',
          "thirdBusinessId":"123"
        }
        gettmarkeingsmsrecord(params).then(res=>{
          
        }).catch((errorRes)=>{
            console.log("errorRes",errorRes);
        })
    },
    //
    handleListApproveHistory(){
       this.ajaxHistoryData =  this.tableData;
       this.total = this.tableData.length;
       if(this.tableData.length < this.pageSize){
             this.historyData  =  this.ajaxHistoryData;
       }else{
         this.historyData =  this.ajaxHistoryData.slice(0,this.pageSize);
       }
    },
    //分页
    changepage(index){
      console.log("第",index + "页");
      let  _start =  (index -  1)  *  this.pageSize;
        console.log(_start);
      let  _end = index  * this.pageSize;
        this.historyData =  this.ajaxHistoryData.slice(_start,_end)
          console.log(this.historyData);
    }
    
  }
}
</script>
<style lang="less" scoped>
  .header {
    width:100%;
    height:60px;
    padding: 14px 20px;
    background-color: #FFF;
    &:hover{
      box-shadow: 0px 5px 5px #CCC; 
      transition: all 0.4s;
    }
  }
  .content{
    width: 100%;
    margin: 20px auto 0;
    .noteDataFunnel,.smsSendingArea{
      height: 600px;
      background-color: #FFF;
    }
    .marketing-table{
      margin-top: 20px;
    }
    .paging{
      margin-top: 20px;
      text-align: right;
    }
  }
</style>