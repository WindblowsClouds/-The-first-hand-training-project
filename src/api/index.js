//当前模块，对api进行统一管理
import requests from './request'
import mockrequest from './mockAjax'
import trade from '@/store/trade'


//三级联动接口:/api/product/getBaseCategoryList |get请求 无参数
export const reqCategory=()=>{
    return  requests.get('/product/getBaseCategoryList')//({url:'/product/getBaseCategoryList'})
}
//轮播图他资源请求接口
export const reqBanner=()=>{
    return mockrequest({url:'/banner'})
}
export const reqFloorList=()=>{
    return mockrequest({url:'/floor'})
}
//获取search模块数，地址：/api/list，请求方式：post，参数：需要带参数
/* 例子
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
//需要传递一个对象作为参数接收数据
export const reqSearchInfo=(params)=> requests({ url:'/list',method:'post',data:params})

//获取详情页数据，请求地址(URL):/api/item/{ skuId } 请求方式 ：GET
export const reqGoodsInfo=(skuId)=> requests({url:`/item/${skuId}`,method:'get'})

//添加到购物车或对已有数据进行改动
//  /api/cart/addToCart/{ skuId }/{ skuNum },请求方式：post
export const reqAddAndUpdataShopCar=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

//获取购物车列表  /api/cart/cartList  请求方式：get
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'})

//购物车删除 /api/cart/deleteCart/{skuId} 请求方式：DELETE
export const reqDeleteCart=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//更改产品状态接口，/api/cart/checkCart/{skuID}/{isChecked}  请求方式：get
export const reqCartChecked=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//发送用户验证码接口 /api/user/passport/sendCode/{phone} 请求方式:get
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//用户注册接口 /api/user/passport/register 请求方式：post
export const reqRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'})

//用户登录接口  /api/user/passport/login  请求方式：post
export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'})
//获取用户信息接口 /user/passport/auth/getUserInfo 
export const reqUserLoginInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录接口 /api/user/passport/logout 请求方式：get
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList  请求方式:get

export const reqUserAddress=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取用户交易页信息 /api/order/auth/trade 请求方式
export const reqUserTrade=()=>requests({url:'/order/auth/trade',method:'get'})

//用户订单接口 /api/order/auth/submitOrder?tradeNo={tradeNo} 请求方式:post
export const reqSumbitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付信息 /api/payment/weixin/createNative/{orderId} 请求方式：get

export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//支付订单状态查询  /api/payment/weixin/queryPayStatus/{orderId} 请求方式:get

export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取个人中心订单信息 /api/order/auth/{page}/{limit}  请求方式：'get'
export const reqMyorderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})

