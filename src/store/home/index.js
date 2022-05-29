//home小仓库
import { reqCategory,reqBanner,reqFloorList} from "@/api"
const actions={
    async categoryList(content){
        //返回的为一个期约
        let result=await reqCategory()
        //将接收的数据以commit提交的mutation
        if(result.code==200){
            content.commit('CATEGORYLIST',result.data)
        }
    },
    //异步请求获取轮播图mock数据
    async  catebannerList({commit}){
        let result=await  reqBanner()
        if(result.code==200){
            commit('CATEBANNER',result.data)
        }
    },
    //请求floor组件资源
    async getfloorList({commit}){
        let result= await reqFloorList()
        if(result.code==200){
            commit('CATEFLOORLIST',result.data)
        }
    }



    
}
const mutations={
    CATEGORYLIST(state,categoryList){
        //将接收的数据发送给state保存
        state.categoryList=categoryList
    },
    //将接受到的数据放入state中保存
    CATEBANNER(state,catebanner){
        state.catebanner=catebanner
    },
    CATEFLOORLIST(state,catefloorList){
        state.catefloorList=catefloorList
    }
}
const state={
    categoryList:[],
    catebanner:[],
    catefloorList:[]
}
const getters={}
export default {
    actions,mutations,state,getters
}
