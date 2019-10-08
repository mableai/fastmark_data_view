<template>
  <div class="contentBox">
    <!-- <h1>访客数据</h1> -->
    <date-time></date-time>
    <div class="echartsbox">
      <!-- <itbale></itbale> -->
      <Row :gutter="12">
        <Col span="9">
          <div id="visitorsoure" class="visitorsoure bordshowColor">
            <common-echart :option="visitorsoureoption" height="425px"></common-echart>
             <div class="newsnot">{{newsnotice}}</div>
          </div>
         
        </Col>
        <Col span="6">
          <div id="sex" class="sex bordshowColor">
            <common-echart :option="sexption" height="190px"></common-echart>
                <div class="newsnot">{{newsnotice}}</div>
          </div>
      
          <div id="terminal" class="terminal bordshowColor mt">
            <common-echart :option="terminaloption" height="220px"></common-echart>
                <div class="newsnot">{{newsnotice}}</div>
          </div>
          <!-- <div>{{newsnotice}}</div> -->
        </Col>
        <Col span="9">
          <div id="timequantum" class="timequantum bordshowColor">
            <common-echart :option="timequantumoption" height="425px"></common-echart>
                <div class="newsnot">{{newsnotice}}</div>
          </div>
          <!-- <div>{{newsnotice}}</div> -->
        </Col>
      </Row>
    </div>
    <div class="echartsbox">
      <Row>
        <Col span="24">
          <div id="province" class="province bordshowColor">
            <common-echart :option="provinceoption" height="425px"></common-echart>
            
             <div class="provinces">
               <i-table stripe  size="small"  :columns="columns1" :data="provincesData"></i-table>
             </div>
          </div>
          <div class="newsnot">{{newsnotice}}</div>
        </Col>
      </Row>
    </div>
    <div class="echartsbox">
      <Row>
        <Col span="24">
         <div class="province bordshowColor">
            <div class="cities">
              <i-table height="200"  size="small" :columns="columns2" :data="citiesData"></i-table>
           </div>
         </div>
          <div class="newsnot">{{newsnotice}}</div>
           
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { postExample, getExample ,postvisits} from "@/api/example/index";
//import echarts from 'echarts'
import commonEchart from "@/components/echarts/commonechart";
import dateTime from "@/components/datePicker/dateTime";
//import itbale from "./itbale";
import echarts from "echarts";
import "../../node_modules/echarts/map/js/china.js";
import "../../node_modules/echarts/theme/macarons.js";
export default {
  name: "visitorData",
  data() {
    return {
      self:this,
      columns1: [
          {
              title: '省份',
              key: 'name',
              // render (row, column, index) {
              //     return `<Icon type="person"></Icon> <strong>${row.name}</strong>`;
              // }
          },
          {
              title: '用户数',
              key: 'value'
          },
          {
              title:  " " ,
              key: 'address',
              render:(h,params) => {
                  //  console.log(params);
                    var row  = params.row;
                  //  console.log(row.value);
                  return h("i-progress",{   
                          props: {
                              // value:"",
                              // size:"small",
                              percent:row.value,
                              "stroke-width":10,
                              "status":"active",
                              // "stroke-color":"#f4f110",
                              "hide-info":true

                          }
                  })
              }
          }
      ],
      provincesData: [
          {
              name: '王小明',
              value: 18,
              address: ''
          },
          {
              name: '张小刚',
              value: 25,
                address: ''
          },
          {
              name: '李小红',
              value: 30,
                address: ''
          },
          {
              name: '周小伟',
              value: 26,
              address: ''
          }
      ],   
      columns2: [
          {
              title: '省份',
              key: 'name',
            alingn:'center'
          },
          {
              title: '用户数',
              key: 'value',
              alingn:'center'
          },
          {
            title:  " " ,
              key: 'address',
              render:(h,params) => {
                  //  console.log(params);
                    var row  = params.row;
                  //  console.log(row.value);
                  return h("i-progress",{   
                          props: {
                              // value:"",
                              // size:"small",
                              percent:row.value,
                              "stroke-width":10,
                              "status":"active",
                              // "stroke-color":"#f4f110",
                              "hide-info":true

                          }
                  })
              }
          }
      ],
      
      citiesData: [
          {
              name: '王小明',
              value: 18,
              address: ' '
          },
          {
              name: '张小刚',
              value: 25,
              address: ' '
          }
      ],        
      newsnotice: "该数据每小时更新一次",
      visitorsoureoption: {
        color:['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80','#8d98b3','#e5cf0d','#97b552','#95706d','#07a2a4'],
        title: {
          text: "活动访客来源",
          // subtext: "该数据每小时更新一次",

          x: "left",
           textStyle: {
           color: '#666666',					// 字体颜色
            fontSize: 18		// 字体大小
          },
          top: "6",
          left: "10"
        },
        tooltip: {
          trigger: "item",
           textStyle:{
             width:"600"
           },
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
          //  wechat：微信好友 moments：朋友圈 sms_link：短信链接  qrcode：二维码  other：其他 
                 formatter:((params)=>{
                          // console.log("活动访客来源tooltip",params);
                       let labelTile =  params.name;
                       if(labelTile ==  "moments"){
                          //  console.log(labelTile ==  "moments");
                           labelTile = "朋友圈"
                       }else if(labelTile ==  "wechat"){
                               labelTile = "微信好友"
                       }else if(labelTile ==  "sms_link"){
                            labelTile = "短信链接"
                       }else if(labelTile ==  "qrcode"){
                               labelTile = "二维码"
                       }else if(labelTile  ==  "other"){
                                   labelTile = "其它"
                       }
                        return  params.seriesName +" : "+ labelTile + '<br>' +  params.percent + "%";
                 }),
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "68%",
            center: ["50%", "55%"],
            label: {
              normal: {
                // formatter: "{b|{b}}\n{per|{d}%}  ",
                //  wechat：微信好友 moments：朋友圈 sms_link：短信链接  qrcode：二维码  other：其他 
                 formatter:((params)=>{
                          // console.log("活动访客来源",params.name);
                       let labelTile =  params.name;
                       if(labelTile ==  "moments"){
  
                           labelTile = "朋友圈"
                       }else if(labelTile ==  "wechat"){
                               labelTile = "微信好友"
                       }else if(labelTile ==  "sms_link"){
                            labelTile = "短信链接"
                       }else if(labelTile ==  "qrcode"){
                               labelTile = "二维码"
                       }else if(labelTile  ==  "other"){
                                   labelTile = "其它"
                       }
                        
                         return '{b|'+labelTile+'}\n{per|'+params.percent+'%}'
                 }),
                borderColor: "#aaa",
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: "#999",
                padding: [0, 7],
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 14,
                    lineHeight: 18
                  },
                  per: {
                    color: "#000",
                    
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: "wechat" },
              { value: 310, name: "moments" },
              { value: 234, name: "qrcode" },
              { value: 135, name: "sms_link" },
              { value: 1548, name: "other" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      sexption: {
        title: {
          text: "性别比例",
          x: "left",
          textStyle: {
           color: '#666666',					// 字体颜色
            fontSize: 18		// 字体大小
          },
          top: "6",
          left: "10"
        },
        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b} : {c} ({d}%)"

           formatter:((params)=>{
                       let labelTile =  params.name;
                       if(labelTile ==  "unknow"){
                           labelTile = "未知"
                       }else if(labelTile ==  "man"){
                               labelTile = "男"
                       }else if(labelTile ==  "woman"){
                            labelTile = "女"
                       }
                      return  params.seriesName +" : "+ labelTile + '<br>' +  params.percent + "%";
                 }),
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "60%",
            center: ["53%", "52%"],
            label: {
              normal: {
             
                 formatter:((params)=>{
                       let labelTile =  params.name;
                       if(labelTile ==  "unknow"){
                           labelTile = "未知"
                       }else if(labelTile ==  "man"){
                               labelTile = "男"
                       }else if(labelTile ==  "woman"){
                            labelTile = "女"
                       }
                        return '{b|'+labelTile+'}\n{per|'+params.percent+'%}'
                 }),
                borderColor: "#aaa",
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowColor: "#999",
                padding: [0, 7],
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 18
                  },
                  per: {
                    color: "#000",
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: "unknow"}, 
              { value: 310, name: "man"},
                { value: 310, name: "woman"}
              ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      terminaloption: {
        title: {
          text: "访客设置信息",
          x: "left",
        textStyle: {
           color: '#666666',					// 字体颜色
            fontSize: 18		// 字体大小
          },
          top: "6",
          left: "10"
        },
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)"
        // },

           tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b} : {c} ({d}%)"

           formatter:((params)=>{
                       let labelTile =  params.name;
                       if(labelTile ==  "unknow"){
                           labelTile = "未知"
                       }
                      return  params.seriesName +" : "+ labelTile + '<br>' +  params.percent + "%";
                 }),
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
           center: ["50%", "56%"],
            label: {
              normal: {
                position: "outside"
              },
               formatter:((params)=>{
                       let labelTile =  params.name;
                       if(labelTile ==  "unknow"){
                           labelTile = "未知"
                       }
                      return labelTile;
                 }),
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 200, name: "ios" },
              { value: 100, name: "android"},
               { value: 100, name: "unknow"}
            ]
          },
          {
            name: "访问来源",
            type: "pie",
            // radius: "60%",
            // center: ["50%", "50%"],
            radius: ["40%", "55%"],
            center: ["50%", "56%"],
            label: {
              normal: {
                // formatter: "{b|{b}}\n{per|{d}%}  ",
                 formatter:((params)=>{
                          // console.log("活动访客来源tooltip",params);
                      //  let labelTile =  params.name;
                       var lableTile = params.name;
                           if(lableTile == "unknow"){
                                  lableTile = "未知"
                           }
                        // return  lableTile + '<br>' +  params.percent + "%";
                        return '{b|'+lableTile+'}\n{per|'+params.percent+'%}'
                 }),
                rich: {
                  b: {
                    fontSize: 16,
                    lineHeight: 18
                  },
                  per: {
                    color: "#000"
                  }
                }
              }
            },
            data: [
              { value: 335, name: "苹果" },
              { value: 310, name: "华为" },
              { value: 234, name: "小米" },
              { value: 135, name: "oppo" },
               { value: 135, name: "unknow"}
            ]
          }
        ]
      },
      timequantumoption: {
        title: {
          text: "访问时段分布",
          x: "lect",
         textStyle: {
           color: '#666666',					// 字体颜色
            fontSize: 18		// 字体大小
          },
          top: "6",
          left: "10"
        },
        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
           formatter:((params)=>{
                          // console.log("活动访客来源tooltip",params);
                      //  let labelTile =  params.name;
                       var lableTile = params.name;
                           if(lableTile == "0_7_hour"){
                                  lableTile = "0 到 7 点"
                           }else if(lableTile == "7_12_hour"){
                                lableTile = "7 到 12 点"
                          }else if(lableTile == "12_14_hour"){
                                    lableTile = "12 到 14 点 "
                          }else if(lableTile == "14_18_hour"){
                                       lableTile = "14 到 18 点"
                          }else if(lableTile == "18_24_hour"){
                                lableTile = "18 到 24 点"
                          }
                        return  params.seriesName +" : "+ lableTile + '<br>' +  params.percent + "%";
                 }),
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            //  radius: "50%",
            radius: ["38%", "50%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                // formatter: "{b|{b}}\n{per|{d}%}  ",
                  formatter:((params)=>{
                    //  console.log("回调数据",params);
                  //7_12_hour：7 到 12 点 
                  // 时间段 0_7_hour：0 到 7 点
                  //  时间段 12_14_hour：12 到 14 点 
                  //  时间段   14_18_hour： 14 到 18 点 
                  //  时间段  18_24_hour：18 到 24 点``
                         var lableTile = params.name;
                           if(lableTile == "0_7_hour"){
                                  lableTile = "0 到 7 点"
                           }else if(lableTile == "7_12_hour"){
                                lableTile = "7 到 12 点"
                          }else if(lableTile == "12_14_hour"){
                                    lableTile = "12 到 14 点 "
                          }else if(lableTile == "14_18_hour"){
                                       lableTile = "14 到 18 点"
                          }else if(lableTile == "18_24_hour"){
                                lableTile = "18 到 24 点"
                          }
                          return '{b|'+lableTile+'}\n{per|'+params.percent+'%}'
                  }),
                borderColor: "#aaa",
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                     align: "left"
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 14,
                    lineHeight: 20,
                    align: "left"
                  },
                  per: {
                    color: "#000",
                    fontSize:14,
                    lineHeight:20,
                     align: "left"
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            //7_12_hour：7 到 12 点 
            // 时间段 0_7_hour：0 到 7 点
            //  时间段 12_14_hour：12 到 14 点 
            //  时间段   14_18_hour： 14 到 18 点 
            //  时间段  18_24_hour：18 到 24 点
            data: [
              { value: 135, name: "7_12_hour"},
              { value: 135, name: "0_7_hour"},
              { value: 335, name: "12_14_hour"},
              { value: 310, name: "14_18_hour"},
              { value: 234, name: "18_24_hour"},
            ]
          }
        ]
      },
      provinceoption: {
        title: {
          text: "省份分布数",
         textStyle: {
           color: '#666666',					// 字体颜色
            fontSize: 22		// 字体大小
          },
          top: "8",
          left: "15"
        },
        tooltip: {
          trigger: "item"
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data:['总投资额']
        // },
        visualMap: {
          min: 0,
          max: 1200,
          left: "2%",
            bottom: "8%",
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
            name: "总投资额",
            type: "map",
            mapType: "china",
            left:"20%",
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
    };
  },
  components: {
    commonEchart,
    dateTime
  },
  created() {},
  mounted() {
    this.initChart()

  },
  updated(){

  },
  methods: {
    randomData() {
      return Math.round(Math.random() * 1000);
    },
    initChart() {
      this.$nextTick(() => {
        let params =    
          {
            activityId:104383,
            businessList:[1,2,3,4,5]
          };
      postvisits(params).then((res)=>{
        console.log("来访客数据",res);
          //  let neworigins = [];
          if(res.head.code == "0"){
                let  resList  = res.body;
                // console.log(resList);
                let  oldorigins = resList.origins;
                let  oldsex  =resList.sex;
                let  oldprovinces = resList.provinces
                let  olddevices = resList.devices;
                let  oldmobileSystems =resList.mobileSystems;   
                let  oldtimeScope = resList.timeScope;
                let  oldcities = resList.cities;
                let  neworigins  = this.convertKey(oldorigins,['value','name']);
                let  newsex  = this.convertKey(oldsex,['value','name']);
                let  newprovinces  = this.convertKey(oldprovinces,['value','name']);
                let  newdevices  = this.convertKey(olddevices,['value','name']);
                let  newmobileSystems  = this.convertKey(oldmobileSystems,['value','name']);
                let  newtimeSope  = this.convertKey(oldtimeScope,['value','name']);
                let  newcities  = this.convertKey(oldcities,['value','name']);
                  console.log("省份",newprovinces);
                
                this.visitorsoureoption.series[0].data =  neworigins;
                this.sexption.series[0].data =  newsex;
                this.provinceoption.series[0].data =  newprovinces;
                  this.terminaloption.series[0].data =  newmobileSystems;
                  this.terminaloption.series[1].data =  newdevices;
                  this.timequantumoption.series[0].data =   newtimeSope;
                  this.provincesData =  newprovinces;
                   this.citiesData =  newcities;       
                  // console.log(this.data1);
            }
        })
      });
    },
    convertKey (arr, key) {
        let newArr = [];
        arr.forEach((item, index) => {
          let newObj = {};
          for (var i = 0; i < key.length; i++) {
            newObj[key[i]] = item[Object.keys(item)[i]]
          }
          newArr.push(newObj);
        })
          // console.log(newArr)
          return newArr;
     }
  }
};
</script>
<style>

  .ivu-table-header th{
           background: #787373;
            font-size: 15px;
            color: #1f1c1c;
            font-family: '\5FAE\8F6F\96C5\9ED1', Microsoft YaHei, Arial, Verdana, Helvetica, sans-serif;
            height: 30px;
            line-height: 30px;
            font-weight: 600; 
    }
    .ivu-progress-inner{
        background-color: transparent;
    }
    .ivu-progress-bg{
        height: 16px !important;
        text-align: right;
        border-radius: 3px;
        background-color: #2d8cf0;
        transition: all .2s linear;
        position: relative;
    }
.echartsbox {
  margin-top: 10px;
}
.bordshowColor {
  position: relative;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  background-color: rgba(255, 255, 255, 1);
  border-width: 1px;
  border-style: solid;
  border-color: rgba(228, 228, 228, 1);
  border-radius: 0px;
}
.newsnot{
     position: absolute;
    left: 10px;
    bottom: 10px;
    font-size: 12px;
    color: #999;
}
.provinces{

    width: 457px;
    height: 356px;
        /* border: 1px solid gold; */
    border: 1px solid transparent;
    position: absolute;
    right: 12px;
    top: 61px;
    overflow: hidden;
}
.cities{
  width: 100%;
   border: 1px solid transparent;
}
.ivu-table-header th{
            background: #8f8c8c;
            font-size: 15px;
            color: #1f1c1c;
            font-family: '\5FAE\8F6F\96C5\9ED1', Microsoft YaHei, Arial, Verdana, Helvetica, sans-serif;
            height: 30px;
            line-height: 30px;
            font-weight: 600; 
    }
    .ivu-progress-inner{
        background-color: transparent;
    }
    .ivu-progress-bg{
        height: 16px !important;
        text-align: right;
        border-radius: 3px;
        background-color: #2d8cf0;
        transition: all .2s linear;
        position: relative;
    }
.mt {
  margin-top: 14px;
}
</style>