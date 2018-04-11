import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './mock/mockServer'
import VueLazyLoad from 'vue-lazyload'
import { Button } from 'mint-ui'
//引入分隔符组件
import Split from './components/Split/Split.vue'
//引入过滤器
import './filters/index'
//loading图的处理
import loading from './common/images/loading.gif'

//注册成全局的组件标签
Vue.component('Split' , Split)
Vue.component(Button.name, Button)

Vue.use(VueLazyLoad, {
  loading
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 注册上路由器(路由相关语法才能使用)
  store
})
