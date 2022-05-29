<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  components: { Header, Footer },
  mounted() {
    //通知vuex发送请求，获取数据，存储在仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>