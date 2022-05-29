//引入vue库
import Vue from 'vue'
//引入vue-router库
import vueRouter from 'vue-router'
//使用vueRouter
import store from '@/store'
Vue.use(vueRouter)
import routes from './routes'
//将push（）保存，避免失去指针被销毁
let originPush=vueRouter.prototype.push
//重写push（）方法
vueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
let originReplace=vueRouter.prototype.originReplace
vueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
let router=  new vueRouter({
    routes,
    //滚动行为，当路由跳转时，滚动条始终在最顶部
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})
export default router

router.beforeEach(async (to,from,next)=>{
let token=store.state.user.token

let name=store.state.user.userInfo.name
//获取用户token，通过token判断用户是否登录

if(token){
    //如果登录了去往'login'
    if(to.path=='/login'||to.path=='/register'){
        next('/home')
    }else{
        //如果登录了不去往'/login'
        if(name){
            next()
        }else{
            //没有用户信息
            try {
                await store.dispatch('getUserLoginInfo')
                next()
            } catch (error) {
                //当用户信息获取错误，即token过期
                //此时清除token，清除用户信息并且重新登录
                await store.dispatch('userLogout')
                next('/login')               
            }       
        }
    }
}else{
    let toPath=to.path;
    //没有登录
    if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
        
        next('/login?redirect='+toPath)
    }else{
        next()
    }
}
})