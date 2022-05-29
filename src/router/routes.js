//引入路由组件
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCarSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
//引入二级路由

export default [
    {
        name: 'center',
        path: '/center',
        component: ()=>import('@/pages/Center'),
        meta: { showFooter: true },
        children: [
            {
                path: 'myorder',
                component: ()=>import("@/pages/Center/MyOrder")
            },
            {
                path: 'grouporder',
                component: ()=>import("@/pages/Center/GroupOrder")
            },
            {
                path: '/center',
                redirect: '/center/myorder'

            }
        ]
    }
    ,

    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: ()=>import("@/pages/PaySuccess"),
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            if(from.path=='/pay'){
                next()
            }else{
                next(false)
            }
        }
    }
    ,
    {
        name: 'pay',
        path: '/pay',
        component: ()=>import("@/pages/Pay"),
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    }
    ,
    {
        name: 'trade',
        path: '/trade',
        component: ()=>import("@/pages/Trade"),
        meta: { showFooter: true },
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    }
    ,
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: { showFooter: true }
    }
    ,
    {
        name: 'addcarsuccess',
        path: '/addcarsuccess',
        component: ()=>import("@/pages/AddCartSuccess"),
        meta: { showFooter: true }
    }
    ,
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: ()=>import('@/pages/Detail'),
        meta: { showFooter: true }
    }
    ,
    {
        path: '/home',
        component:()=>import("@/pages/Home"),
        meta: { showFooter: true }
    }
    ,
    {
        name: 'login',
        path: '/login',
        component: ()=>import("@/pages/Login"),
        meta: { showFooter: false }
    }
    ,
    {
        path: '/register',
        component: ()=>import("@/pages/Register"),
        meta: { showFooter: false }
    }
    ,
    {
        name: 'search',
        //指定pramas参数可传可不传，在占位后面添加“？”
        path: '/search/:keyword?',
        component: ()=>import("@/pages/Search"),
        meta: { showFooter: true }
    },
    //重定向，项目跑起来的时候立马跑到首页
    {
        path: '*',
        redirect: "/home"
    }
]