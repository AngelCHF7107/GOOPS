<template>
  <div>
    <div class="goods">
      <!--左边的goods分类-->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="(good , index) in shopGoods" :key="index"
              :class="{current: currentIndex===index}" @click="selectGood(index)">
            <span class="text bottom-border-1px">
              <span class="icon" :class="supportClasses[good.type]" v-if="good.type>=0"></span>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右边的食品分类列表-->
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good , index) in shopGoods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food , index) in good.foods" :key="index"
                  @click="selectFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  import Food from '../../../components/Food/Food.vue'

  export default {
    data() {
      return {
        supportClasses: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        tops:[], //所以li的top组件的top值
        scrollY:0, //当前Y 轴滚动的坐标
        food:{} //food的对象
      }
    },
    mounted (){
      this.$store.dispatch('getShopGoods' , () => {//状态已经更新需要action中调用
        //等到组件加载完成之后就要调用
        this.$nextTick(() => {
         //初始化滚动条
          this._initScroll()
          //初始化tops的值
          this._initTops()
        })

      })

    },
    computed: {
      ...mapState(['shopGoods']),
      //计算当前分类的下标
      currentIndex(){
        //得到top和scrollY的值
        const {tops , scrollY} = this
        return tops.findIndex((top , index) => scrollY>=top && scrollY<tops[index+1])
      }
    },
    methods:{
      _initTops(){
        const tops = []//所以li的top值
        let top = 0 //li的初始值
        tops.push(top)
        //拿到li
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        //因为lis是维数组变真的数组
        Array.prototype.slice.call(lis).forEach(li => {
          //得到所有li的top的总和
          top += li.clientHeight
          tops.push(top)
        })
        this.tops = tops
      },
      _initScroll(){
        //创建左边滑动的scroll对象
        new BScroll('.menu-wrapper' , {
          click:true
        })
        //创建右侧的scroll对象
        this.rightScroll = new BScroll('.foods-wrapper' , {
          probeType:2,
          click:true
        })
        //绑定scroll 监听
        this.rightScroll.on('scroll' , (pos) => {
          console.log('scroll' , pos.x , pos.y)
          //更新scroll的状态
          this.scrollY = Math.abs(pos.y)
        })
        //绑定scrollEnd的监听
        this.rightScroll.on('scrollEnd' , (pos) => {
          console.log('滑动结束了' , pos.y)
          //更新scrollY的值
          this.scrollY = Math.abs(pos.y)
        })
      },
      selectGood(index){
        //得到对应的位置的坐标
        const y = -this.tops[index]
        //右侧滑动到对应的位置
        this.rightScroll.scrollTo(0 , y , 300)
      },
      selectFood(food){
        //更新food的状态
        this.food = food
        //显示food组件
        this.$refs.food.toggleShow()
      }

    },
    components:{
      CartControl,
      ShopCart,
      Food
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('./images/decrease_3')
          &.discount
            bg-image('./images/discount_3')
          &.guarantee
            bg-image('./images/guarantee_3')
          &.invoice
            bg-image('./images/invoice_3')
          &.special
            bg-image('./images/special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
