<template>
  <div class="my-container">
    <div class="left">
      <el-avatar
        shape="square"
        size="large"
        src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      />
      <div class="welcome">欢迎你，13*******71</div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color=""
        text-color=""
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="1">我的关注</el-menu-item>
        <el-menu-item index="2">个人资料</el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <component :is="mainContent" />
      <router-link class="return" to="/house">返回 </router-link>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import follow from "@/pages/my/views/follow.vue";
import myinfo from "@/pages/my/views/my-info.vue";

// 侧边栏切换内容
const mainContent = ref(follow);
const handleSelect = (key, keyPath) => {
  if (key == 1) {
    mainContent.value = follow;
  } else if (key == 2) {
    mainContent.value = myinfo;
  }
};
</script>
<style scope>
.my-container {
  display: flex;
  justify-content: center;
  padding: 0 15%;
  margin-top: 35px;
  background-color: rgb(245, 245, 246);
  padding-bottom: 10%;
  .left {
    background-color: #fff;
    border: 1px solid rgb(233, 232, 232);
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    height: 500px;
    .el-avatar {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .welcome {
    }
    .el-menu-vertical-demo {
      margin-top: 20px;
      border: none;
      .el-menu-item {
        height: 40px;
      }
    }
  }
  .right {
    flex: 1;
    background-color: #fff;
    position: relative;
  }
}
</style>
