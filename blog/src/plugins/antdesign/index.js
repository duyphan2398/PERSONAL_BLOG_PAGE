import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'

import {
  Popconfirm,
  notification,
  message,
} from 'ant-design-vue'

Vue.use(Popconfirm)

Vue.prototype.$notification = notification
Vue.prototype.$message = message
