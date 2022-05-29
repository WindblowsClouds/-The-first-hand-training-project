import { reqUserAddress, reqUserTrade } from "@/api"

const actions={
    //获取用户地址
     async getUserAddress({commit}){
      let result=await reqUserAddress()
      if(result.code==200){
          commit('GETUSERADDRESS',result.data)
      }
    },
    //获取用户交易信息
    async getUserTrade({commit}){
        let result=await reqUserTrade()
        if(result.code==200){
            commit('GETUSERTRADE',result.data)
        }
    }
}
const mutations={
    GETUSERADDRESS(state,userAddress){
        state.userAddress=userAddress
    },
    GETUSERTRADE(state,userTrade){
        state.userTrade=userTrade

    }

}
const state={
    userAddress:[],
    userTrade:{}
}
const getters={}
export default {
    actions, mutations, state, getters
}