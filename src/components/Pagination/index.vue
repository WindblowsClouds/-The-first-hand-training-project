<template>
  <div class="pagination">
    <button  :disabled='pageNo==1' @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>

    <button v-if="startNumAndEndNum.start>2">···</button>

    <button v-for="(page,index) of startNumAndEndNum.end" 
    :key="index" v-show="page>=startNumAndEndNum.start" 
    @click="$emit('getPageNo',page)"
    :class="{active:pageNo==page}"
    >{{page}}</button>
    
    <button v-if="totalPage-startNumAndEndNum.end>1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage" 
    @click="$emit('getPageNo',totalPage)"
    :class="{active:pageNo==totalPage}"
    
    >{{totalPage}}</button>
    <button :disabled='pageNo==totalPage' @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">{{total}}</button>
  </div>
</template>

<script>
import { start } from 'nprogress'
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','comtinues'],
    computed:{
        //计算总页数
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        //计算初始页和最页
        startNumAndEndNum(){
            const {pageNo,total,comtinues,totalPage}=this
            let start=0,end=0;
            //当分页数大于总页数
            if(comtinues>totalPage){
                start=1
                end=totalPage
            }else{
                start=pageNo-parseInt(comtinues/2)
                end=pageNo+parseInt(comtinues/2)
                
                if(start<1){
                    start=1
                    end=comtinues
                }
                if(end>totalPage){
                    start=totalPage-comtinues+1
                    end=totalPage
                }
            }
            return {start,end}
        }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
      text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
    background: skyblue;
  }
</style>
