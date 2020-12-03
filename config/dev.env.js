'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ENDPOINT: '"https://www.api.tnguyenofficial.com"',
  USER_API_ENDPOINT: '"https://www.api.tnguyenofficial.com"',
  WEB_ENDPOINT: '"https://www.api.tnguyenofficial.com"',
  CLIENT_ENV: '"development"'
})
