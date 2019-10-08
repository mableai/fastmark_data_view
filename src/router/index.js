import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Index',
    //   component: Index
    // },
    {
      path: '/',
      name: 'indexHeader',
      // component: Index,
      component: () => import('@/view/indexHeader'),
      redirect: 'baseData',
      children: [
        {
          path: '/baseData',
          component: () => import('@/view/baseData'),
          meta: { title: '基础数据' },
          name: 'baseData'
        },
        {
          path: '/communicationAnalysis',
          component: () => import('@/view/communicationAnalysis'),
          meta: { title: '传播分析' },
          name: 'communicationAnalysis'
        },
        {
          path: '/visitorData',
          component: () => import('@/view/visitorData'),
          meta: { title: '访客数据' },
          name: 'visitorData'
        },
        {
          path: '/tableData',
          component: () => import('@/view/tableData'),
          meta: { title: '表单数据' },
          name: 'tableData'
        },
        {
          path: '/marketingData',
          component: () => import('@/view/marketingData'),
          meta: { title: '营销数据' },
          name: 'marketingData'
        },
      ]
    }
  ]
})
