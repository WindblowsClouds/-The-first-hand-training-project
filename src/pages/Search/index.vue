<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            //categoryName面包屑
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            //keyword面包屑
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li> 
            //trademark面包屑
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <!-- attr面包屑 -->
            <li class="with-x" v-for="(attrprops,index) of searchParams.props" 
            :key="index">{{attrprops.split(':')[1]}}<i @click="removeAttrValue(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo='trademarkInfo' @attrValueInfo='attrValueInfo'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActive}" @click="changeOrder('1')">
                  <a>综合 <span v-show="isActive" class=" iconfont" :class="isArrow" ></span> </a>
                </li>
                <li :class="{active:!isActive}" @click="changeOrder('2')">
                  <a>价格 <span v-show="!isActive" class=" iconfont" :class="isArrow"  ></span> </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good of goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link  :to="`/detail/${good.id}`"><img :src="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo='searchParams.pageNo' :total='total' :pageSize='searchParams.pageSize' :comtinues='5' @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        //一级分类id
        category1Id: "",
        //二级分类
        category2Id: "",
        //三级分类
        category3Id: "",
        //分类名字
        categoryName: "",
        //关键字
        keyword: "",
        //排序，默认为综合降序
        order:"1:desc",
        //分页器，代表当前第几页
        pageNo: 1,
        //代表每一页展示数据个数
        pageSize: 5,
        //平台售卖属性带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {},
  mounted() {},
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({total:state=>state.search.searchList.total}),
    //添加active
    isActive(){
      return this.searchParams.order.indexOf('1')!=-1?true:false
    },
    //添加箭头以及箭头是'升'或者'降'
    isArrow(){
      return this.searchParams.order.indexOf('asc')!=-1?'icon-up':'icon-down'
    },


  },
  methods: {
    //向服务器发送请求获取数据
    //封装成函数，需要时调用即可
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //删除CategoryName分类名字
    removeCategoryName(){
      //将数据设为undefind，将不会发送给服务器，减少服务器负担
      this.searchParams.categoryName=undefined
      this.resetCategoryId()
      this.getData()
      if(this.$route.params){
        this.$router.push({name:'search',params:this.$route.params})
      }
    },
    //删除keyword面包屑分类
    removeKeyword(){
      //将服务器的searchParams.keyword置空
      this.searchParams.keyword=undefined
      //发送请求
      this.getData()
      //全局事件总线，实现兄弟之间的通信
      this.$bus.$emit('clear')
      //借用路由跳转本身，重置url参数
      if(this.$route.query){
        this.$router.push({name:'search',query:this.$route.query})
      }
    },
    //重置searchParams.category'n'Id方法
    resetCategoryId(){
      this.searchParams.category1Id=undefined
      this.searchParams.category2Id=undefined
      this.searchParams.category3Id=undefined
    },
    //自定义品牌事件
    trademarkInfo(trademark){
      //trademark格式：ID：name
      this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
      //发送请求 
      this.getData()
    },
    //清除trademark面包屑
    removeTrademark(){
      //将tramark置空
      this.searchParams.trademark=undefined
      //发送请求
      this.getData()

    },
    //自定义'属性'事件
    attrValueInfo(attr,attrValue){
      let attrprops=`${attr.attrId}:${attrValue}:${attr.attrName}`
      //数组去重，防止重复属性一直添加
      if(this.searchParams.props.indexOf(attrprops)===-1){
        this.searchParams.props.push(attrprops)
      }
      //发送请求
      this.getData();
    },
    //清除'属性'面包屑
    removeAttrValue(index){
      //整理数组
      this.searchParams.props.splice(index,1)
      //放松请求
      this.getData() 

    },
    //排序方法
    changeOrder(flag){
      console.log(flag);
      let originOrder=this.searchParams.order.split(':')
      let originFlag=originOrder[0]
      let originSort=originOrder[1]
      let newOrder=''
      if(flag==originFlag){
        newOrder=`${originFlag}:${originSort=='asc'?'desc':'asc'}`
      }
      else{
        newOrder=`${flag}:${'desc'}`
      }
      this.searchParams.order=newOrder;
      this.getData()
      
    },
    //"获取页数"自定义事件，子组件给父组件传送信息
    getPageNo(pageNo){
      //整理带给服务器的参数，将子组件传回来的信息传给服务器
      this.searchParams.pageNo=pageNo
      //发送请求
      this.getData()
    }
    },
  watch: {
    //监视路由变化，每一次路由变化就发送请求
    $route: {
      //立即开始调用一次
      immediate: true,
      handler(newvalue, oldvalue) {
        //在调用前重置一次避免菜单id乱入
        this.resetCategoryId()
        //通过object.assign方法，将
        Object.assign(this.searchParams, this.$route.params, this.$route.query);
        this.getData();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>