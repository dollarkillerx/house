<template>
  <div class="search-container">
    <div class="search">
      <input type="text" placeholder="请输入区域、商圈或小区名开始找房"/>
      <el-icon><Search /></el-icon>
    </div>
  </div>
</template>
<script setup></script>
<style scope>
.search-container {
  padding: 20px 10%;
  .search {
    background-color: #fff;
    width: 50%;
    display: flex;
    padding: 8px;
    box-shadow: 0 1px 2px -1px rgba(0,0,0,.2);
    input {
        flex:1;
    }
    .el-icon {
        font-size: 16px;
        transition: 0.3s;
        cursor: pointer;
    }

    .el-icon:hover {
        transform: scale(1.2);
    }
  }
}
</style>
