'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',//生产环境
  BASE_API: '"/api/"',//这里设置了proxyTable代理,BASE_API链接填/api/  
})
