//该模块对axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入vuex仓库，以便获取uuid
import detail from '../store/detail'
import user from "@/store/user";
//nprogress：done()方法：进度条结束，start()进度条结束
//引入进度条样式
import "nprogress/nprogress.css"
const requests=axios.create({
    //两个配置对象
    //请求基础路径
    baseURL:'/api',
    //请求超时时间
    timeout:5000
})
//请求拦截器：发送请求之前，请求拦截器可以检测，可以对请求做一些处理
requests.interceptors.request.use((config)=>{
    //配置对象，config里面有一个重要的属性，headers请求头
    //进度条开始
    nprogress.start()
    //将游客的uuid在请求头中带给服务器
    if(detail.state.uuid_token){
        config.headers.userTempId=detail.state.uuid_token
    }
    //在请求头中将用户的唯一标识token带给服务器，以便向服务器索要数据
    if(user.state.token){
        config.headers.token=user.state.token
    }
   
    return config
})
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done()
    /* console.log(res.data); */
    //res.data为一个完整的数据响应，里面包含想要的数据data
    return res.data
},(err)=>{
    return Promise.reject(new Error('faile'))
})
export default requests
