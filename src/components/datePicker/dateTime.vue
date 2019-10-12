<template>
  <div class="selectBox">
    <DatePicker type="daterange" :value="defaultDate" :options="options2" placement="bottom-end" placeholder="请选择查询时间" style="width: 300px" @on-change="dateTimeChange"></DatePicker>
    <Button type="primary" style="margin-left:30px;" @click="searchBtn">查询</Button>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import { timestampToDate, getNowDate } from '@/utils'
  export default {
    name: "DataPicker",
    //props: ["defaultDate"],
    // props: {
    //   defaultDate: {
    //     type: Array,
    //     required: true,
    //     default: []
    //   }
    // },
    data() {
      return {
        startDate: null,//开始时间
        endDate: null,
        options2: {
          shortcuts: [
            {
              text: '至今',
              value() {
                const end = new Date();
                const start = new Date('2019-10-01 00:00:00');//此处用的是活动开始时间
                start.setTime(new Date(start.getTime()).setHours(0, 0, 0, 0));
                end.setTime(new Date(end.getTime() - 3600 * 1000 * 24 * 0).setHours(23, 59, 59, 999));
                return [start, end];
              }
            },
            {
              text: '今天',
              value() {
                const end = new Date();
                const start = new Date();
                start.setHours(0, 0, 0, 0);
                end.setTime(new Date(end.getTime() - 3600 * 1000 * 24 * 0).setHours(23, 59, 59, 999));
                return [start, end];
              }
            },
            {
              text: '昨天',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(new Date(start.getTime() - 3600 * 1000 * 24 * 1).setHours(0, 0, 0, 0));
                end.setTime(new Date(end.getTime() - 3600 * 1000 * 24 * 1).setHours(23, 59, 59, 999));
                return [start, end];
              }
            },
            {
              text: '最近7天',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '最近30天',
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            }
          ]
        },
        defaultDate: [],
      }
    },
    computed: {
      ...mapGetters([
        'activityStartDate',
      ]),
    },
    watch: {
      activityStartDate: {
        handler(newValue, oldValue) {
          this.defaultDate = [];
          this.defaultDate[0] = timestampToDate(new Date(newValue).getTime());
          this.defaultDate[1] = getNowDate();
          const temp2 = newValue;
          // const temp2 = '2019-09-13 00:00:00';
          this.options2.shortcuts[0] = {
            text: '至今',
            value() {
              const end = new Date();
              const start = new Date(newValue);//此处用的是活动开始时间
              start.setTime(new Date(start.getTime()).setHours(0, 0, 0, 0));
              end.setTime(new Date(end.getTime() - 3600 * 1000 * 24 * 0).setHours(23, 59, 59, 999));
              return [start, end];
            }
          }
        },
        deep: true, //深度监听
        immediate: true
      },
    },
    created() {
      this.startDate = this.defaultDate[0];
      this.endDate = this.defaultDate[1];
    },
    mounted() {
        // console.log("获取DatePicker组件",this.$listeners);
    },
    methods: {
      dateTimeChange(v) {
        this.startDate = v[0]
        this.endDate = v[1]
      },
      searchBtn() {
        let p = {
          startDate: this.startDate,
          endDate: this.endDate
        }
        this.$emit('search', p)
      },
    }
  };
</script>

<style lang="less" scoped>
  .selectBox {
    padding: 10px 20px;
    background-color: #fff;
    box-shadow: 5px 6px 5px 0px rgba(12, 1, 4, 0.4);
    /deep/ .ivu-picker-panel-sidebar {
      width: 97px;
      margin-left: -97px;
    }
  }
</style>