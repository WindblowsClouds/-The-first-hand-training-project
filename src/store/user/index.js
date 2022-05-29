import { reqGetCode,reqLogout,reqRegister, reqUserLogin, reqUserLoginInfo } from "@/api"
import { TOKEN ,getTOKEN, removeToken} from "@/utils/token"
const actions = {
    //用户验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async getRegister({commit},user){
      let result=await reqRegister(user)
      console.log(result);
      if(result.code==200){
          return 'ok'
      }else{
          return Promise.reject(new Error('faile'))
      }
    },
    //用户登录
    async getUserLogin({commit},login){
        let result= await reqUserLogin(login)
        if(result.code==200){
            //服务器下发唯一的用户的标识，经常用于使用token找服务器索要数据进行展示
            commit('GETUSERLOGIN',result.data.token)
            //调用函数，将token存储在本地存储中
            TOKEN(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }

    },
    //用户信息
    //需要在请求头中携带token传给服务器
/*     async getUserLoginInfo({commit}){
       let result=await reqUserLoginInfo()
       if(result.code==200){
           commit('GETUSERLOGININFO',result.data)
           return 'ok'
       }else{
           return Promise.reject(new Error('faile'))
       }
    }, */
    async getUserLoginInfo({commit}){
        let result= await reqUserLoginInfo()
        if(result.code==200){
            commit('GETUSERLOGININFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    //需要清除token、userInfo和本地存储信息
    async userLogout({commit}){
        let result=await reqLogout()
        if(result.code==200){
            commit('LOGOUT')
            return 'ok'
        }else{
            return Promise.reject(new Error('falie'))
        }
    }
        
}
const mutations = {
    GETCODE(state,userCode){
        state.userCode=userCode
    },
    GETUSERLOGIN(state,token){
        state.token=token
    },
    GETUSERLOGININFO(state,userInfo){
        state.userInfo=userInfo
    },
    LOGOUT(state){
        state.userInfo=''
        state.token=''
        removeToken()
    }
}
const state = {
    userCode:'',
    //直接获取本地存储中的token
    token:getTOKEN(),
    userInfo:{}
}
const getters = {}
export default {
    actions, mutations, state, getters
}