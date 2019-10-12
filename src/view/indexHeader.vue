<template>
  <div class="wrap">
    <Spin v-show="loading" size="large" fix style="z-index: 1000000;">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div style="font-size: 12px;">加载中...</div>
    </Spin>
    <div class="headBar">
      <ul class="clearfix">
        <li v-for="(item, index) in routerParams" :key="index">
          <router-link :to="item.path + '?' + activityIdQuery">{{ item.meta.title }}</router-link>
        </li>
      </ul>
    </div>
    <!-- 公共选择区域 -->
    <div class="publicSelectionArea">
      <div style="display: flex;align-items: center;">
        <Select v-model="form.model1" style="width:150px" size="large" @on-change="selectChange" placeholder="请选择活动">
          <Option v-for="(item, index) in activityList" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
        <div style="width: 1px; display: inline-block;background-color: #aeaeae;margin: 0 30px;height: 25px"> </div>
<!--        <user-select v-model="form.user3" :multiple="true" style="display: inline-block;width: 210px" @input="handleUserSelected" @select="change" />-->
        <treeselect
          :load-options="loadUserOrgs"
          :options="orgusers"
          :auto-load-root-options="false"
          v-model="form.user3"
          :multiple="true"
          :show-count="false"
          value-consists-of="LEAF_PRIORITY"
          no-children-text="空记录"
          retry-text="重试"
          placeholder="请选择用户"
          @input="handleUserInput"
          @select="DRHA_EFaultModeTree_handleSelect"
          @deselect="DRHA_EFaultModeTree_handleDeSelect"
          :normalizer="normalizer"
          :disable-branch-nodes="false"
          :flat="true"
          :default-expand-level="1"
          style="display: inline-block;max-width: 350px;"
        />
      </div>
      <div style="display: flex;align-items: center;">
        <div>
          <span>活动名称：</span><span class="activityTitle">{{ activityName }}</span>
        </div>
        <div>
          <span style="margin-left: 35px;">活动时间：</span>{{ activityStartDate }} ~ {{ activityEndDate }}
        </div>
      </div>
    </div>
<!--    <keep-alive>-->
      <router-view v-if="activityStartDate" />
<!--    </keep-alive>-->
  </div>
</template>

<script>
import UserSelect from "@/components/UserSelect";
import { listActivityHierarchy, listBusiness } from "@/api/example";
import { setToken, getToken } from '@/utils/auth'
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"
export default {
  name: "Header",
  components: {
    UserSelect,
    Treeselect
  },
  data() {
    return {
      loading: false,
      activityIdQuery: '',
      activityId: '',
      routerParams: [],
      activityList: [],
      form: {
        model1: '',
        user2: { id: "2", name: "李四" },
        user3: []
      },
      activityName: '',
      activityStartDate: '',
      activityEndDate: '',
      orgusers: null,
      normalizer(node) {
        //console.log('normalizer:',node)
        //去掉children=[]的children属性
        if(node.children && !node.children.length){
          delete node.children;
        }
        if (node.businessId === "-1") {
          node.isDisabled = true;
        }
        //console.log('normalizer:之后',node)
        return node
      },
      nodeBusinessId: [],
    }
  },
  created() {
    //this.$router.push({path:'baseData',query:{'requestId':'B25888BB6C6F7013E3402FF387B6C0B1','activityId':'104383'}})
    //存储token
    // if(!getToken()) {
    //   console.log('存储token')
    //   setToken(this.$route.query.requestId)
    //   this.$router.replace({
    //     path: '/baseData?' + 'activityId=' + this.$route.query.activityId
    //   });
    // }
    setToken(this.$route.query.requestId)
    this.$router.replace({
      path: '/baseData?' + 'activityId=' + this.$route.query.activityId
    });
    this.activityIdQuery = 'activityId=' + this.$route.query.activityId;
    this.activityId = this.$route.query.activityId;
    this.routerParams = this.$router.options.routes[0].children
    //console.log("this.$router", this.routerParams)
    //TODO这里拿到活动开始时间和活动id,和businessId,用vuex存储起来，
    this.loading = true;
    this.getActivityList()
  },
  methods: {
    DRHA_EFaultModeTree_handleSelect(node,instanceId){
      this.nodeBusinessId.push(node.businessId);
      //console.log('node-----this.nodeBusinessId', this.nodeBusinessId)
      this.$store.dispatch('BusinessList', this.nodeBusinessId);
    },
    DRHA_EFaultModeTree_handleDeSelect(node) {
      //console.log('未选择node', node)
      for (let i = 0; i < this.nodeBusinessId.length; i++){
        if(node.businessId === this.nodeBusinessId[i]){
          this.nodeBusinessId.splice(i,1);
        }
      }
      //console.log('未选择node-----this.nodeBusinessId', this.nodeBusinessId)
    },
    handleUserInput(node) {
      //console.log("select user node:", node)
      if (node.length === 0) {
        this.nodeBusinessId = [];
        this.$store.dispatch('BusinessList', this.nodeBusinessId);
      }
      // this.$store.dispatch('BusinessList', node);
      //console.log("22select user node:", JSON.stringify(this.form.user2))
    },
    selectChange(v) {
      this.form.model1 = v;
      this.activityList.map((item) => {
        if (v === item.id) {
          this.activityName = item.name;
          this.activityStartDate = item.startTime;
          this.activityEndDate = item.endTime;
          this.$store.dispatch('activityStartDate', this.activityStartDate)
        }
      })
      // this.$store.commit('set_activityId', this.form.model1)
      this.$store.dispatch('getActivityId', this.form.model1)
      if(this.form.model1) {
        this.getBusinessList()
      }
    },
    getActivityList() {
      let params = {
        params: {
          pageIndex: 0,
          pageSize: 1000
        }
      }
      listActivityHierarchy(params).then((res) => {
        if(res) {
          this.activityList = res.body;
          if (this.activityId) {
            this.form.model1 = Number(this.activityId);
            //循环根据id。查找出对应的活动名称，活动开始时间
            this.activityList.map((item) => {
              if (this.form.model1 === item.id) {
                this.activityName = item.name;
                this.activityStartDate = item.startTime;
                this.activityEndDate = item.endTime;
              }
            })
          } else {
            //如果浏览器顶部没有传输过来活动id(activityId)，则我们默认显示第一个
            this.form.model1 = this.activityList[0].id;
            this.activityName = this.activityList[0].name;
            this.activityStartDate = this.activityList[0].startTime;
            this.activityEndDate = this.activityList[0].endTime;
          }
          this.$store.dispatch('getActivityId', this.form.model1);
          this.$store.commit('set_activityStartDate', this.activityStartDate);
          // this.$store.dispatch('activityStartDate', this.activityStartDate)
          //console.log('获取时间', this.$store.getters.activityStartDate)
          this.getBusinessList()
        }
        this.loading = false;
      }).catch((errorRes) => {
        this.loading = false;
      })
    },
    getBusinessList() {
      listBusiness({ "activityId": this.form.model1 }).then((res) => {
        if (res) {
          this.orgusers = res.body;
          this.form.user3 = [];
          this.form.user3[0] = res.body[0].id;
          // this.$store.dispatch('BusinessList', this.form.user3);
          let tempBusinessId = [];
          this.nodeBusinessId = [];
          tempBusinessId.push(res.body[0].businessId);
          this.nodeBusinessId.push(res.body[0].businessId);
          this.$store.dispatch('BusinessList', tempBusinessId);
          //console.log('ActivityId', this.$store.getters.activityId)
        }
      }).catch((errorRes) => {

      })
    },
    loadUserOrgs({action, parentNode, callback}) {
      // console.log(action, parentNode, this.org)
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  min-height: 100vh;
  .headBar {
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    width: 100%;
    background-color: #dddddd;
    ul {
      display: flex;
      padding: 0 125px;
      width: 900px;
      li {
        float: left;
        // flex: 1;
        width: 135px;
        text-align: center;
        a {
          color: #000000;
          /*font-size: 18px;*/
          display: inline-block;
          width: 100%;
        }
        a.router-link-active {
          /*color: #d3102c;*/
          border-bottom: 2px solid #FA8909;
        }
      }
    }
  }
  .publicSelectionArea {
    padding: 10px 270px;
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
