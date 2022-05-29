//导入mock模块
import  Mock  from "mockjs";
//导入json文件，json文件不需要对外暴露即可导入·
import banner from './banner.json'
import floor from './floor.json'
//模拟首页轮播图
Mock.mock("/mock/banner",{code:200,data:banner})

Mock.mock("/mock/floor",{code:200,data:floor})