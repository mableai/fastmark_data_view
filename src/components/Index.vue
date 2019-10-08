// <template>
//   <div class="wrap">
//     <div class="headBar">
//       <ul class="clearfix">
//         <li v-for="(item, index) in routerParams" :key="index">
//           <router-link :to="item.path">{{ item.meta.title }}</router-link>
//         </li>
//       </ul>
//     </div>
//     <div class="publicSelectionArea">
//       <div>
//         <Select v-model="model1" style="width:200px">
//           <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
//         </Select>
//       </div>
//       <div>
//         <span>活动名称：</span>我要去上学
//         <span style="margin-left: 35px;">活动时间：</span>2019-09-10 10：00 ~ 2019-09-26 10：00：00
//       </div>
//     </div>
//     <keep-alive>
//       <router-view />
//     </keep-alive>
//   </div>
// </template>

// <script>
// export default {
//   name: "Header",
//   data() {
//     return {
//       routerParams: [],
//       cityList: [
//         {
//           value: 'New York',
//           label: 'New York'
//         },
//         {
//           value: 'London',
//           label: 'London'
//         },
//         {
//           value: 'Sydney',
//           label: 'Sydney'
//         },
//         {
//           value: 'Ottawa',
//           label: 'Ottawa'
//         },
//         {
//           value: 'Paris',
//           label: 'Paris'
//         },
//         {
//           value: 'Canberra',
//           label: 'Canberra'
//         }
//       ],
//       model1: ''
//     }
//   },
//   created() {
//     this.routerParams = this.$router.options.routes[0].children
//     console.log("this.$router", this.routerParams)
//   }
// }
// </script>

// <style lang="less" scoped>
// .wrap {
//   height: 100vh;
//   .headBar {
//     height: 52px;
//     line-height: 50px;
//     font-size: 16px;
//     width: 100%;
//     background-color: #dddddd;
//     ul {
//       display: flex;
//       padding: 0 50px;
//       width: 900px;
//       li {
//         float: left;
//         // flex: 1;
//         width: 135px;
//         text-align: center;
//         a {
//           color: #000000;
//           font-size: 18px;
//           display: inline-block;
//           width: 100%;
//         }
//         a.router-link-active {
//           color: #d3102c;
//           border-bottom: 2px solid #d3102c;
//         }
//       }
//     }
//   }
//   .publicSelectionArea {
//     padding: 10px 80px;
//     height: 115px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
// }
// </style>>
