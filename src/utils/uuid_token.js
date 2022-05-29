import { v4 as uuidv4 } from 'uuid';
//生成一个唯一的随机字符串，每次执行不发生变化，在本地仓库持久存储
export const getUUID=()=>{
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    //判断uuid是否存在，保证只生成一次
    if(!uuid_token){
        //生成游客临时身份
        uuid_token=uuidv4()
        //本地持久存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    } 
    return uuid_token;

}