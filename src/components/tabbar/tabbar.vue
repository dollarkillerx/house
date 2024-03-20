<template>
  <van-tabbar v-model="active" route active-color="#3760b6">
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/my" icon="friends-o">我的</van-tabbar-item>
  </van-tabbar>

</template>
<script setup>
import { ref } from 'vue';


const active = ref(0);

</script>
<style scope></style>