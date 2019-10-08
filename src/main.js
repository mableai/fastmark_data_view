// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import store from './store'//引入store
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import 'babel-polyfill'
import 'iview/dist/styles/iview.css';
import '@/styles/reset.css'
Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
