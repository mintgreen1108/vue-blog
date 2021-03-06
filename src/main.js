import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import "./axios.js"
import global_ from "./common/Global.js"

Vue.prototype.$axios = axios
Vue.prototype.GLOBAL = global_
Vue.config.productionTip = false
Vue.use(Element)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
