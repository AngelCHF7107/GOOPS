<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {reqAddress} from './api/index'
//你好
export default {
  mounted(){
    /*const result = await reqAddress('40.10038,116.39867')
    console.log(result)*/
    this.$store.dispatch('getAddress')
    //获取user
    this.$store.dispatch('getUserInfo')
  },
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
