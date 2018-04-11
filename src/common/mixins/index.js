/*包含vue组件所有mixin组件*/

export const ratingsMixin = {
  data () {
    return {
      selectType: 0,
      onlyContent: true
    }
  },
  computed:{

    filterRatings () {
      const ratings = this.shopRatings || this.food.ratings
      // 如果还没有数据, 直接返回空数组
      if(!ratings) {// 如果此时ratings没有值, 直接返回一个[]
        return []
      }
      const {selectType, onlyContent} = this
//        const ratings = this.shopRatings
      return ratings.filter(rating => {
        const {rateType, text} = rating
        /*判断过滤之后是true还是false
         条件1：selectType：0/1/2
                rateType:0/1
                结果就是：
                selectType===2 || selectType===rateType
         条件2：onlyContent：true/false
               text:有值/没有值
               结果是：
               !onlyContent || text.length>0
       */
        return (selectType===2 || selectType===rateType) && (!onlyContent || text.length>0)
      })
    }
  },
  methods:{
    setSelectType (selectType) {
      this.selectType = selectType
    },

    toggleOnlyContent () {
      this.onlyContent = !this.onlyContent
    }
  },



}
