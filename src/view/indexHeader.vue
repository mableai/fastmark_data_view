<template>
  <div class="wrap">
    <div class="headBar">
      <ul class="clearfix">
        <li v-for="(item, index) in routerParams" :key="index">
          <router-link :to="item.path">{{ item.meta.title }}</router-link>
        </li>
      </ul>
    </div>
    <!-- 公共选择区域 -->
    <div class="publicSelectionArea">
      <div style="display: flex;align-items: center;flex: 0.5;">
        <Select v-model="form.model1" style="width:200px" size="large">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div style="width: 1px; display: inline-block;background-color: #aeaeae;margin: 0 30px;height: 25px"> </div>
        <user-select v-model="form.user3" :multiple="true" style="display: inline-block;width: 210px" />
      </div>
      <div style="display: flex;align-items: center;">
        <span>活动名称：</span><span class="activityTitle">我要去上学2222</span>
        <span style="margin-left: 35px;">活动时间：</span>2019-09-10 10：00 ~ 2019-09-26 10：00：00
      </div>
    </div>
<!--    <keep-alive>-->
      <router-view />
<!--    </keep-alive>-->
  </div>
</template>

<script>
import UserSelect from "@/components/UserSelect";
export default {
  name: "Header",
  components: {
    UserSelect,
  },
  data() {
    return {
      routerParams: [],
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
      ],
      form: {
        model1: '',
        user2: { id: "2", name: "李四" },
        user3: []
      }
    }
  },
  created() {
    this.routerParams = this.$router.options.routes[0].children
    console.log("this.$router", this.routerParams)
  },
  methods: {
    handleUserSelected(node) {
      console.log("select user node:", JSON.stringify(node))
      this.form.user2 = node
      console.log("22select user node:", JSON.stringify(this.form.user2))
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  min-height: 100vh;
  .headBar {
    height: 52px;
    line-height: 50px;
    font-size: 16px;
    width: 100%;
    background-color: #dddddd;
    ul {
      display: flex;
      padding: 0 50px;
      width: 900px;
      li {
        float: left;
        // flex: 1;
        width: 135px;
        text-align: center;
        a {
          color: #000000;
          font-size: 18px;
          display: inline-block;
          width: 100%;
        }
        a.router-link-active {
          color: #d3102c;
          border-bottom: 2px solid #d3102c;
        }
      }
    }
  }
  .publicSelectionArea {
    padding: 10px 80px;
    height: 115px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .activityTitle {
      width: 130px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>>
