<template>
  <div class="contentBox">
    <header class="header">
      <Form class="form" :model="formItem">
        <Row>
          <Col span="5">
            <FormItem class="formItem" label="会员ID：">
              <Input v-model="formItem.memberId" placeholder="请输入内容" style="width:120px;"></Input>
            </FormItem>
          </Col>  
          <Col span="10">
            <FormItem class="formItem" label="时间段：">
              <Row>
                <Col span="9">
                  <FormItem prop="datetime">
                    <DatePicker type="datetime" placeholder="选择开始时间" v-model="formItem.time.startTime"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="9">
                  <FormItem prop="datetime">
                    <DatePicker type="datetime" placeholder="选择结束时间" v-model="formItem.time.endTime"></DatePicker>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem class="formItem" label="中奖状态：">
              <Select v-model="formItem.state" style="width:90px">
                <Option v-for="item in formItem.stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="2">
            <Button type="primary" @click="tableInquire">查询</Button>
          </Col>
          <Col span="3">
            <Button class="exportData-btn" type="primary" ghost @click="exportData()"><Icon type="ios-download-outline" :size="18"></Icon>导出活动数据</Button>
          </Col>
        </Row>
      </Form>
    </header>
    <div class="content">
      <Table :columns="tableHeader" :data="tableData" ref="table"></Table>
      <Page class="paging" :total="formItem.totalSize" :current="formItem.pageIndex" :pageSize="formItem.pageSize" @on-change="changePageIndex" @on-page-size-change="changePageSize" show-elevator show-sizer show-total />
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import { postLotterRecord } from "@/api/example/table"
export default {
  name: "tableData",
  data() {
    return {
      formItem: {
        memberId: "",
        time: {
          startTime: "",
          endTime: ""
        },
        state:"",
        stateList:[
          {
            value: "",
            label: "全部"
          },
          {
            value: "0",
            label: "未中奖"
          },
          {
            value: "1",
            label: "中奖"
          },
          {
            value: "2",
            label: "已领取"
          }
        ],
        prizeName: '',
        pageIndex: 1,
        pageSize: 10,
        totalSize: 100
      },
      tableHeader: [
        {
          title: '会员ID',
          key: 'memberId'
        },
        {
          title: '抽奖时间',
          key: 'lotteryTime'
        },
        {
          title: '中奖状态',
          key: 'winningState',
          width: 100
        },
        {
          title: '奖品类型',
          key: 'prizeType',
          width: 100
        },
        {
          title: '奖品',
          key: 'prizeName'
        },
        {
          title: '领奖信息',
          key: 'getInfo'
        },
        {
          title: '发放信息',
          key: 'grantInfo'
        }
      ],
      tableData: [
        // {
        //   memberId: '123123',
        //   lotteryTime: '2017-09-23 09:12:21',
        //   winningState: '未中奖',
        //   prizeType: '券',
        //   prizeName: '阿萨姆线上优惠券',
        //   getInfo: '姓名：陈冠希;手机号码：15920111234',
        //   grantInfo: '已发放（核销人：15020111235）'
        // },
        // {
        //   memberId: '345345',
        //   lotteryTime: '2017-09-23 09:12:21',
        //   winningState: '已中奖',
        //   prizeType: '话费',
        //   prizeName: '五元话费',
        //   getInfo: '手机号码：15920111234;',
        //   grantInfo: '发放失败'
        // }
      ]
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
    businessList: {
      handler(newValue, oldValue) {
        console.log('监听表单页面的businessList----', newValue)
        if(newValue.length > 0) {
          this.getLotteryRecord();
        }
      },
      deep: true, //深度监听
      immediate: true
    },
  },
  created() {
    
  },
  mounted(){
    //this.getLotteryRecord();
  },
  methods:{
    exportData (type) {
      this.$refs.table.exportCsv({
        filename: 'The original data'
      });
    },
    getLotteryRecord(){
      let query = {
        "activityId": this.activityId,
        "businessList": this.businessList,
        "params":{
          "pageIndex": this.formItem.pageIndex,
          "pageSize": this.formItem.pageSize,
          "startDate": this.formItem.time.startTime,
          "endDate": this.formItem.time.endTime,
          "status": this.formItem.state,
          "memberId": this.formItem.memberId,
          "prizeName": this.formItem.prizeName
        }
      }
      console.log(query);
      postLotterRecord(query).then(res=>{
        console.log("表单数据：",res);
        if(res.head.code==0){
          let data = res.body.rows;
          this.formItem.totalSize = data.length;
          this.tableData = [];
          for(var i in data){
            let dateItem = {
              memberId: data[i].member_id==undefined?'-':data[i].member_id,
              lotteryTime: data[i].create_time==undefined?'-':data[i].create_time,
              winningState: (data[i].lottery_status==0?"未中奖":"中奖"),
              prizeType: (data[i].award_type==1?"流量":data[i].award_type==2?"券":"自定义奖品"),
              prizeName: data[i].awards_name==undefined?'-':data[i].awards_name,
              getInfo: data[i].get_info==undefined?'-':data[i].get_info,
              grantInfo: data[i].push_info==undefined?'-':data[i].push_info
            }
            this.tableData.push(dateItem);
          }
        }
      }).catch((errorRes) => {
        console.log('errorRes', errorRes)
      })
    },
    changePageIndex(data){
      this.formItem.pageIndex = data;
      this.getLotteryRecord();
    },
    changePageSize(data){
      this.formItem.pageSize = data;
      this.getLotteryRecord();
    },
    tableInquire(){
      this.getLotteryRecord();
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
    .exportData-btn{
      background: #2D8CF0;
      color: #FFF;
    }
  }
  .content{
    width: 100%;
    margin: 20px auto 0;
    padding: 20px;
    background-color: #FFF;
    .paging{
      margin-top: 20px;
      text-align: right;
      .ivu-page-item{
        &.ivu-page-item-active{
          background: #2D8CF0;
        }
      }
    }
  }
  /deep/ .ivu-table-header th {
    background: #E1F0FF;
  }
  /deep/.ivu-form-item-label{
    color: #666;
    font-size: 14px;
  }
  /deep/.ivu-page-item-active{
    background-color: #2D8CF0;
    color: #FFF;
  }
  /deep/.ivu-page-item-active a, .ivu-page-item-active:hover a{
    color: #FFF;
  }
</style>