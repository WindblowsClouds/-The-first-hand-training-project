<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <Recomment/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor) of catefloorList" :key="floor.id" :list='floor'/>
    <Brand/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ListContainer from '@/pages/Home/ListContainer'
import Recomment from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
export default {
  name:'Home',
  components:{
    ListContainer,
    Recomment,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    ...mapState({catefloorList:state=>state.home.catefloorList})
  },
  mounted(){
    this.$store.dispatch('getfloorList')
    
  }

}
</script>

<style>

</style>