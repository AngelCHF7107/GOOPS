<!--
<template>
  &lt;!&ndash; class="on"&ndash;&gt;
    <div class="msite">
      &lt;!&ndash;首页头部&ndash;&gt;
      <HeaderTop :title="address.name">
        <router-link class="header_search" to="/search" slot="search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
        <router-link class="header_login" to="/login" slot="login">
          <span class="header_login_text">登录|注册</span>
        </router-link>
      </HeaderTop>
      &lt;!&ndash;<header class="header">

        <span class="header_search">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_title">
            <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
          </span>
        <span class="header_login">
            <span class="header_login_text">登录|注册</span>
          </span>
      </header>&ndash;&gt;
      &lt;!&ndash;首页导航&ndash;&gt;
      <nav class="msite_nav border-1px">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(categorys , index) in categorysArr" :key="index">
              <a href="javascript:" class="link_to_food" v-for="(category , index) in categorys" :key="index">
                <div class="food_container">
                  &lt;!&ndash;img应该动态生成然后需要一个公共的地址定义data&ndash;&gt;
                  <img :src="imgBaseUrl+category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>
              &lt;!&ndash;<a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/2.jpg">
                </div>
                <span>商超便利</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/3.jpg">
                </div>
                <span>美食</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/4.jpg">
                </div>
                <span>简餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/5.jpg">
                </div>
                <span>新店特惠</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/6.jpg">
                </div>
                <span>准时达</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/7.jpg">
                </div>
                <span>预订早餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/8.jpg">
                </div>
                <span>土豪推荐</span>
              </a>&ndash;&gt;
            </div>
           &lt;!&ndash; <div class="swiper-slide">
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/9.jpg">
                </div>
                <span>甜品饮品</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/10.jpg">
                </div>
                <span>商超便利</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/11.jpg">
                </div>
                <span>美食</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/12.jpg">
                </div>
                <span>简餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/13.jpg">
                </div>
                <span>新店特惠</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/14.jpg">
                </div>
                <span>准时达</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/1.jpg">
                </div>
                <span>预订早餐</span>
              </a>
              <a href="javascript:" class="link_to_food">
                <div class="food_container">
                  <img src="./images/nav/2.jpg">
                </div>
                <span>土豪推荐</span>
              </a>
            </div>&ndash;&gt;
          </div>
          &lt;!&ndash; Add Pagination &ndash;&gt;
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      &lt;!&ndash;首页附近商家&ndash;&gt;
      <ShopList/>
    </div>

</template>

<script>
  //得到state中的数据
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'
  export default {
    data(){
      return{
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },

    mounted(){
      //异步获取食品列表的数据,action中不需要传递任何数据
      this.$store.dispatch('getCategorys')
      //异步获取商家列表的数据,action中不需要传递任何数据
      this.$store.dispatch('getShops')

      /*new Swiper('.swiper-container' , {
        loop: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      })*/
    },
    //计算属性中操作数据
    computed: {
      ...mapState(['address' , 'categorys']),
      //计算属性计算需要的商品的列表信息
      categorysArr (){
        //创建一个新的数组是一个二维数组
        const arr = []
        //得到所有的商品列表信息categorys
        const {categorys} = this
        //创建一个内部的小数组
        let smallArr = []
        //小数组的最大长度是8
        const max = 8
        //遍历所有的categorys添加到小数组中
        categorys.forEach(c => {
          //把小数组放入大的数组中arr中,有可能smallArr是；一个空的
          if(smallArr.length===0){
            arr.push(smallArr)
          }
          smallArr.push(c)

          //但是如果小的数组满了够8个了就要一个新的数组
          if(smallArr.length===max){
            //建立一个新的数组 前面用的const不能同名要改let
            smallArr = []
          }
        })
        //返出去的是一个分类的对象[[{},{}] ,[{},{}]]
        return arr
      }

    },
    //轮播失效就要监视看数组中什么时候会有值
    watch:{
      categorys(newValue){
        /*new Swiper('.swiper-container' , {
          loop: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        })*/

        //延时加载
        /*setTimeout(() => {
          new Swiper('.swiper-container' , {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        },200)*/

        this.$nextTick(() => { // 回调函数在DOM更新之后立即调用
          new Swiper('.swiper-container' , {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      }
    },
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
-->
<template>
  <div class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link class="header_search" to="/search"  slot="search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>

      <router-link class="header_login" to="/login" slot="login">
        <span class="header_login_text">登录|注册</span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="categorys.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index2) in categorys" :key="index2">
              <div class="food_container">
                <img :src="imgBaseUrl+c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <!--有一个加载的过程-->
      <img src="./images/msite_back.svg" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'  // 引入swiper的js库
  import 'swiper/dist/css/swiper.min.css' // 引入swiper的样式文件

  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'

  export default {

    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },

    mounted () {

      //异步获取食品分类列表
      this.$store.dispatch('getCategorys')
      // 异步获取shops
      this.$store.dispatch('getShops')

      // 创建swiper对象, 实现轮播效果
      /* new Swiper('.swiper-container', { // 配置对象
         loop: true, // 是否循环轮播,
         pagination: { // 指定分页器容器
           el: '.swiper-pagination',
         },
       })*/
    },

    computed: {
      ...mapState(['address', 'categorys']),

      categorysArr () {
        const arr = [] // 二维数组
        const {categorys} = this // 所有分类的一维数组
        let smallArr = [] // 内部的小数组
        const max = 8 //小数组的最大长度是8

        // 遍历所有分类
        categorys.forEach(c => {

          // 如果smallArr是一个空数组, 将小数组保存到二维数组
          if(smallArr.length===0) {
            arr.push(smallArr)
          }

          // 将分类保存到小数组中
          smallArr.push(c)

          // 一旦小数组满了, 准备一个新的
          if(smallArr.length===max) {
            smallArr = []
          }

        })

        return arr  // [[{分类对象}, {分类对象}], [{分类对象}]]
      }
    },

    watch: {
      // 更新状态之后, 会异步更新界面
      categorys (value) { // categorys发生了变化(从后台获取到了数据)
        /*setTimeout(() => {
          new Swiper('.swiper-container', { // 配置对象
            loop: true, // 是否循环轮播,
            pagination: { // 指定分页器容器
              el: '.swiper-pagination',
            },
          })
        }, 200)*/
        this.$nextTick(() => { // 回调函数在DOM更新之后立即调用
          new Swiper('.swiper-container', { // 配置对象
            loop: true, // 是否循环轮播,
            pagination: { // 指定分页器容器
              el: '.swiper-pagination',
            },
          })
        })

      }
    },

    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          > span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
