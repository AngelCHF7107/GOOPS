/*过滤器的组件*/
import Vue from 'vue'
import moment from 'moment'
//全局定义过滤器
Vue.filter('dateString' , function (value , format='YY-MM-DD HH:mm:ss') {
  //这个过滤器中需要库moment
  //return moment(value).format('YY-MM-DD HH:mm:ss')
  return moment(value).format(format)
})
