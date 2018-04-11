<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item"  v-for="(starClass , index) in starClasses" :key="index" :class="starClass"></span>
    <!--<span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span>-->
  </div>
</template>
<script>
  const CLASS_ON = 'on'
  const CLASS_HELF = 'helf'
  const CLASS_OFF = 'off'

  export default {
    props:{
      //得到分数的值
      score:Number,
      //得到尺寸的值
      size:Number
    },
    //使用计算属性计算starClasses
    //定义表示显示的常量
    computed:{
      starClasses(){
        //定义一个数组保存类名
        const star = []
        //操作是添加到定义的数组中去
        //拿到分数,向下取整
        const {score} = this
        const scoreInteger = Math.floor(score)
        //循环遍历scoreInteger确定加不加星
        for (var i=0; i<scoreInteger; i++) {
          star.push(CLASS_ON)
        }
        //判断半星
        if((score-scoreInteger)*10 >= 5){
          star.push(CLASS_HELF)
        }
        //判断不加星
        while (star.length<5){
          star.push(CLASS_OFF)
        }

        //返回一个数组
        return star
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
