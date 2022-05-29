import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
//引入三级联动组件
import TypeNav from '@/components/TypeNav'
//引入轮播图组件
import Carousel from '@/components/Carousel'
//引入分页器组件
import Pagination from '@/components/Pagination'
//注册全局组件三级联动
//测试
/* import {reqCategory} from '@/api'
reqCategory() */
import store from '@/store'
//引入mock，使其执行一次
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"

//将APi接口引入main文件中
import * as API from '@/api'
//测试数据
/* import { reqSearchInfo ,reqCategory} from './api'
console.log(reqSearchInfo({}));
console.log(reqCategory()); */
Vue.component(TypeNav.name,TypeNav)
//注册轮播图全局组件
Vue.component(Carousel.name,Carousel)
//注册分页器的全局组件
Vue.component(Pagination.name,Pagination)
//引入element-ui组件
import { MessageBox } from 'element-ui'
//引入表单验证文件
import '@/plugins/validate'
//注册element组件，这里使用msgbox下的alert
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
  // 注册全局事件总线 
  beforeCreate(){
    Vue.prototype.$bus=this
    //将api接口引入main文件，并且放在vue的原型上，只需要引入一次，所有组件都可使用
    Vue.prototype.$API=API
  }
}).$mount('#app')


