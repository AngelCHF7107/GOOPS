/*actions模块*/

import {RECEIVE_ADDRESS , RECEIVE_CATEGORYS , RECEIVE_SHOPS , RECEIVE_USER_INFO,
        RECEIVE_SHOP_GOODS , RECEIVE_SHOP_INFO , RECEIVE_SHOP_RATINGS ,
        INCREMENT_FOOD_COUNT , DECREMENT_FOOD_COUNT , CLEAR_CART} from './mutation-types'

import {reqAddress , reqFoodList , reqShopList , reqUserInfo ,  reqShopGoods,
        reqShopRatings, reqShopInfo} from '../api/index'

export default {
  //得到地址信息的action函数
  async getAddress({commit , state}){
    //获取初始化经纬度
    const {latitude , longitude} = state
    //得到ajax请求拿到的数据
    const result = await reqAddress(latitude + ',' + longitude)
    //判断拿到的数据是否正确
    if(result.code === 0){
      //得到data中的address
      const address = result.data
      //得到之后要更新数据给mutations执行需要调用commit
      commit(RECEIVE_ADDRESS , {address})
    }
  },
  //得到食品列表信息的action函数
  async getCategorys({commit}){
    //得到ajax请求拿到的数据
    const result = await reqFoodList()
    //判断拿到的数据是否正确
    if(result.code === 0){
      //得到data中的categorys
      const categorys = result.data
      //得到之后要更新数据给mutations执行需要调用commit
      commit(RECEIVE_CATEGORYS , {categorys})
    }
  },
  //得到商家列表信息的action函数
  async getShops({commit , state}){
    //获取初始化经纬度
    const {latitude , longitude} = state
    //得到ajax请求拿到的数据
    const result = await reqShopList(latitude + longitude)
    //判断拿到的数据是否正确
    if(result.code === 0){
      //得到data中的shops
      const shops = result.data
      //得到之后要更新数据给mutations执行需要调用commit
      commit(RECEIVE_SHOPS , {shops})
    }
  },
  //存得到用户信息的action函数
  saveUserInfo({commit} , userInfo){
    commit(RECEIVE_USER_INFO , {userInfo})
  },
  //异步获取用户
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code===0){
      const userInfo = result.data
      commit(RECEIVE_USER_INFO , {userInfo})
    }
  },


  //异步获取商家商品列表
  async getShopGoods({commit} , callback){
    const result = await reqShopGoods()
    if(result.code===0){
      const shopGoods = result.data
      commit(RECEIVE_SHOP_GOODS , {shopGoods})
      callback && callback()
    }
  },
  //异步获取商家评论列表
  async getShopRatings({commit} , cb){
    const result = await reqShopRatings()
    if(result.code===0){
      const shopRatings = result.data
      commit(RECEIVE_SHOP_RATINGS , {shopRatings})
      cb && cb()
    }
  },
  //异步获取商家信息
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code===0){
      const shopInfo = result.data
      commit(RECEIVE_SHOP_INFO , {shopInfo})
    }
  },

  //获取count的信息
  updateFoodCount({commit} , {food , isAdd}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT , {food})
    }else {
      commit(DECREMENT_FOOD_COUNT , {food})
    }
  },

  //清空购物车
  clearCart({commit}){
    commit(CLEAR_CART)
  }
}
