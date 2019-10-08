import request from '@/utils/request'
//post请求示例
export function postExample(query) {
  return request({
    url: '/v1/fastmarkedit/activity/post',
    method: 'post',
    data: query
  })
}
// get请求示例
export function getExample(query) {
  return request({
    url: '/v1/fastmarkedit/activity/edit',
    method: 'get',
    params: query
  })
}

export function postvisits(query) {
  return request({
    url: '/activity/report/visits',
    method: 'post',
    data: query
  })
}

//=============这里是基础数据的接口================
//基础数据统计结果(基础数据折线图)
export function getBaseDate(query) {
  return request({
    url: '/data/base/statistics/days',
    method: 'post',
    data: query
  })
}
//基础数据统计总量
export function getBaseDateTotal(query) {
  return request({
    url: '/data/base/statistics/total',
    method: 'post',
    data: query
  })
}
//=================这里是基础数据的接口================

//=================这里是传播分析的接口================
//查询传播分析用户列表
export function shareList(query) {
  return request({
    url: '/data/share/list',
    method: 'post',
    data: query
  })
}
//查询用户传播分析详情接口
export function shareDetail(query) {
  return request({
    url: '/data/share/detail',
    method: 'post',
    data: query
  })
}

//=================这里是营销数据的接口================
//查询短信端口详情接口
export function postmarkeingToal(query){
   return   request({
     url:'/data/base/statistics/total',
     method:'post',
     data:query
   });
}
//查询短信分发区域
export function postmarkeingSpread(query){
  return  request({
    url:'/data/marketing/area/distribution',
    method:'post',
    data:query
  });
}
//查询短息发送记录

 export function gettmarkeingsmsrecord(query){
    return request({
      url:'/data/marketing/sms/record',
      method: 'get',
      params: query
    });
 }