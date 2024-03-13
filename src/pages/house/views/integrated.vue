<template>
  <div class="integrated-container">
    
  <button @click="gotoMy">修改资料</button>
    <div class="integrated-card">
      <div class="card" v-for="(item, index) in 5" :key="index" @click="gotoDetail">
        <div class="card-left"><img src="@/assets/house/house1.jpg" alt="" /></div>
        <div class="card-main">
          <div class="tit">
            {{ houseList.rentway }} {{ houseList.tit }} {{ houseList.layout }}
            {{ houseList.direction }}
          </div>
          <div class="sub">
            <span>{{ houseList.address }}</span>
            &nbsp;/&nbsp;
            <span>{{ houseList.square }}</span>
            &nbsp;/&nbsp;
            <span>{{ houseList.direction }}</span>
            &nbsp;/&nbsp;
            <span>{{ houseList.layout }}</span>
          </div>
          <div class="tag">
            <span v-for="(houseList1, index1) in houseList.tag" :key="index1">{{
              houseList1
            }}</span>
          </div>
        </div>
        <div class="card-right">
          <span>{{ houseList.price }}</span
          >元/月
        </div>
      </div>
    </div>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="990"
    />
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import plbLic from "@/config/public";
//房子数据
const houseList = plbLic();

console.log(houseList)

// 跳转详情页
const router = useRouter();
function gotoDetail() {
  router.push("house-detail");
}
function gotoMy(){
    router.push("my");
}
</script>
<style scope>
@import "./style.scss";
</style>
