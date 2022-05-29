import { reqGoodsInfo,reqAddAndUpdataShopCar } from "@/api"
//封装游客随机身份模块，生成一个随机字符串uuid
import {getUUID} from '@/utils/uuid_token'
const actions={
    async getGoodsInfo({commit},skuId){
        let result= await reqGoodsInfo(skuId)
        if(result.code==200){
            commit('GETGOODSINFO',result.data)
        }
    },
    async AddAndUpdataShopCar({commit},{skuId,skuNum}){
       let result= await reqAddAndUpdataShopCar(skuId,skuNum)
       //return返回一个期约，如果发送请求成功，返回是一个字符串，代表解决的期约
       //return返回一个拒绝的期约，代表请求服务器失败
       if(result.code==200){
           return 'ok'
       }else{
           return Promise.reject(new Error('faile'))
       }
    }
}
const mutations={
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo=goodsInfo
    }

}
const state={
    goodsInfo:{},
    //游客身份uuid
    uuid_token:getUUID()
}
const getters={
    categoryView(state){
        return state.goodsInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[]
    }
}

export default {
    actions,mutations,state,getters
}