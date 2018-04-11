/*mutations模块*/
import Vue from 'vue'
import {RECEIVE_ADDRESS , RECEIVE_CATEGORYS , RECEIVE_SHOPS , RECEIVE_USER_INFO,
        RECEIVE_SHOP_GOODS , RECEIVE_SHOP_RATINGS , RECEIVE_SHOP_INFO ,
        INCREMENT_FOOD_COUNT , DECREMENT_FOOD_COUNT , CLEAR_CART} from './mutation-types'


export default {
  //更新address的mutation函数
  [RECEIVE_ADDRESS] (state , {address}){
    state.address = address
  },
  //更新category的mutation函数
  [RECEIVE_CATEGORYS] (state , {categorys }){
    state.categorys = categorys
  },
  //更新shops的mutation函数
  [RECEIVE_SHOPS] (state , {shops}){
    state.shops = shops
  },
  //更新用户信息
  [RECEIVE_USER_INFO](state , {userInfo}){
    state.userInfo = userInfo
  },

  //更新商家商品列表
  [RECEIVE_SHOP_GOODS](state , {shopGoods}){
    state.shopGoods = shopGoods
  },
  //更新商家评论列表
  [RECEIVE_SHOP_RATINGS](state , {shopRatings}){
    state.shopRatings = shopRatings
  },
  //更新商家信息
  [RECEIVE_SHOP_INFO](state , {shopInfo}){
    state.shopInfo = shopInfo
  },
  //更新加法
  [INCREMENT_FOOD_COUNT](state , {food}){
    if(food.count){
      food.count++
    }else {
      //这样写没有显示
      //food.count = 1//没有count加一个count属性并且值是1
      Vue.set(food , 'count' , 1)
      state.shopCart.push(food)
    }
  },
  //更新减法
  [DECREMENT_FOOD_COUNT](state , {food}){
    if(food.count){
      food.count--
      //判断是否为0
      if(food.count === 0){
        //把food从购物车数组中删除
        state.shopCart.splice(state.shopCart.indexOf(food) , 1)
      }
    }
  },
  //清空购物车
  [CLEAR_CART](state){
    //这一步不够因为food还关联了别的组件
    state.shopCart.forEach(food => food.count = 0)
    state.shopCart = []
  }
}
