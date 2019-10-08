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
            <Button type="primary">查询</Button>
          </Col>
          <Col span="3">
            <Button type="primary" ghost @click="exportData()"><Icon type="ios-download-outline" :size="18"></Icon>导出活动数据</Button>
          </Col>
        </Row>
      </Form>
    </header>
    <div class="content">
      <Table :columns="tableHeader" :data="tableData" ref="table"></Table>
      <Page class="paging" :total="100" :pageSize="10" show-elevator show-sizer show-total />
    </div>
  </div>
</template>
<script>
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
        state:"全部",
        stateList:[
          {
            value: "全部",
            label: "全部"
          },
          {
            value: "未中奖",
            label: "未中奖"
          },
          {
            value: "已中奖",
            label: "已中奖"
          },
          {
            value: "已核销",
            label: "已核销"
          }
        ]
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
        {
          memberId: '123123',
          lotteryTime: '2017-09-23 09:12:21',
          winningState: '未中奖',
          prizeType: '券',
          prizeName: '阿萨姆线上优惠券',
          getInfo: '姓名：陈冠希;手机号码：15920111234',
          grantInfo: '已发放（核销人：15020111235）'
        },
        {
          memberId: '345345',
          lotteryTime: '2017-09-23 09:12:21',
          winningState: '已中奖',
          prizeType: '话费',
          prizeName: '五元话费',
          getInfo: '手机号码：15920111234;',
          grantInfo: '发放失败'
        },
        {
          memberId: '524524',
          lotteryTime: '2017-09-23 09:12:21',
          winningState: '已核销',
          prizeType: '实物',
          prizeName: '保温杯一个',
          getInfo: '手机号码：666666;',
          grantInfo: '未发放'
        },
        {
          memberId: '752752',
          lotteryTime: '2017-09-23 09:12:21',
          winningState: '未中奖',
          prizeType: '实物',
          prizeName: 'iphone11 Pro一台',
          getInfo: '手机号码：9999;',
          grantInfo: '发放失败'
        }
      ]
    }
  },
  created() {

  },
  mounted(){

  },
  methods:{
    exportData (type) {
        this.$refs.table.exportCsv({
            filename: 'The original data'
        });
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
    padding: 20px;
    background-color: #FFF;
    .paging{
      margin-top: 20px;
      text-align: right;
    }
  }
</style>