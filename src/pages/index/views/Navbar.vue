<template>
  <div class="navbar-container">
    <div class="left">
      <span>你的位置</span>
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <div class="right">
      <el-icon><Avatar /></el-icon>
      <div @click="operateLogin">退出登录</div>
    </div>
  </div>
  <!-- 登录弹窗 -->
  <!-- <el-dialog
    v-model="res.dialogVisible"
    width="500"
    center
    :close-on-click-modal="false"
  >
    <Sigup/>
  </el-dialog> -->
</template>
<script setup>
import Sigup from '@/pages/index/views/Sigup.vue'
import { reactive} from "vue";

// 登录弹窗
// const res = reactive({
//   dialogVisible: false,
// });
// const showSigup =()=>{
//   res.dialogVisible=true;
// }
const operateLogin =()=>{
}
</script>
<style scope>
.navbar-container {
  background-color: rgb(48, 48, 53);
  color: rgb(147, 153, 165);
  display: flex;
  justify-content: space-between;
  padding: 8px 10%;
  .left {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    cursor: pointer;
    .el-icon {
      margin-right: 4px;
      font-size: 16px;
    }
  }
  .right:hover {
    color: white;
  }
}
</style>
