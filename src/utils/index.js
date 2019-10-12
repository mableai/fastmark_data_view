// 解决toFixed()无法精准保留小数的问题
export function toFixedNumber(data,val){
  var numbers = '';
  // 保留几位小数后面添加几个0
  for (var i = 0; i < val; i++) {
    numbers += '0';
  }
  var s = 1 + numbers;
  // 如果是整数需要添加后面的0
  var spot = "." + numbers;
  // Math.round四舍五入
  //  parseFloat() 函数可解析一个字符串，并返回一个浮点数。
  var value = Math.round(parseFloat(data) * s) / s;
  // 从小数点后面进行分割
  var d = value.toString().split(".");
  if (d.length == 1) {
    value = value.toString() + spot;
    return value;
  }
  if (d.length > 1) {
    if (d[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
}
export function getNowDate() {
  //获取当前日期
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  var nowDate = year + "-" + month + "-" + day;
  return year + "-" + month + "-" + day;
}
//由时间戳获取年月日
export function timestampToDate(timestamp) {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return Y + M + D;
}
//由时间戳获取时分秒
export function timestampToTime(timestamp) {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return h + m + s;
}
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}