<template>
    <!-- 导航栏 -->
    <van-nav-bar title="详情页" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 导航栏 -->

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <!-- 轮播图 -->

    <!-- 房子信息 -->
    <div class="detail-content">
        <h1>content</h1>
    </div>
    <!-- 房子信息 -->

    <!-- 地图 -->
    <div class="map-container">
    <Map></Map>
</div>
    <!-- 地图 -->
</template>
<script setup>
import houseList from '../../data/houseList.json'
import { ref, reactive, toRef } from "vue";
import Map from "../../components/MapContainer/MapContainer.vue"

const onClickLeft = () => history.back();

</script>
<style scope>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}

.map-container{
    width: 100%;
    height: 300px;
}
</style>