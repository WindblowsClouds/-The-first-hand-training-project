import { reqCartList, reqDeleteCart,reqCartChecked } from "@/api"
const actions = {
    //获取购物车商品
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //购物车删除商品,!!!{commit}必须占位
    async deleteCart({ commid }, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //更改购物车商品状态
    async getCartChecked({commit},{skuId,isChecked}){
        let result=await reqCartChecked(skuId,isChecked)
        console.log(skuId,isChecked);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }


}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const state = {
    cartList: []
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    actions, mutations, state, getters
}