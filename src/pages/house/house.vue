<template>
  <div class="house-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">租房</el-breadcrumb-item>
      <el-breadcrumb-item>广州</el-breadcrumb-item>
      <el-breadcrumb-item>{{ areaItem }}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 筛选条件 -->
    <div class="area-wrapper">
      <div class="area-item">
        <div class="left">区域</div>
        <div class="right">
          <div
            class="area"
            v-for="(item, index) in areaList"
            :key="index"
            v-on:click="areaActive(index, item)"
            :class="areaActiveClass == index ? 'active' : ''"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="area-item">
        <div class="left">方式</div>
        <div class="right">
          <div
            class="area"
            v-for="(item, index) in approachList"
            :key="index"
            v-on:click="approachActive(index)"
            :class="approachActiveClass == index ? 'active' : ''"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="area-item">
        <div class="left">租金</div>
        <div class="right">
          <div
            class="area"
            v-for="(item, index) in rentList"
            :key="index"
            v-on:click="rentActive(index)"
            :class="rentActiveClass == index ? 'active' : ''"
          >
            {{ item }}
          </div>
        </div>
        <div class="rent-input">
          <input type="text" />
          <span>1</span>
          <input type="text" />
          <span>元</span>
          <button>确定</button>
        </div>
      </div>
      <div class="area-item">
        <div class="left">户型</div>
        <div class="right">
          <div
            class="area"
            v-for="(item, index) in housetypeList"
            :key="index"
            v-on:click="housetypeActive(index)"
            :class="housetypeActiveClass == index ? 'active' : ''"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="area-item">
        <div class="left">租期</div>
        <div class="right">
          <div
            class="area"
            v-for="(item, index) in dateList"
            :key="index"
            v-on:click="dateActive(index)"
            :class="dateActiveClass == index ? 'active' : ''"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <!-- 筛选结果 -->
    <div class="res-wrapper">
      <div class="res-head">
        <div class="left">
          已为您找到 <span class="res-count">17209</span> 套租房
        </div>
        <div class="right">清空条件</div>
      </div>
      <div class="res-main">
        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="horizontal"
          @select="menuChange"
        >
          <el-menu-item index="1">综合排序</el-menu-item>
          <el-menu-item index="2">最新上架</el-menu-item>
          <el-menu-item index="3">价格</el-menu-item>
        </el-menu>
        <div class="res-house">
          <component :is="showHouse"/> 
          <hotHouse></hotHouse>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import integrated from "@/pages/house/views/integrated";
import lastnew from "@/pages/house/views/lastnew";
import price from "@/pages/house/views/price";
import hotHouse from "@/components/hotHouse";

// 房子
var showHouse = ref(integrated)

const menuChange = (key, keyPath) => {
  if (key == 1) {
    showHouse.value=integrated
  } else if (key == 2) {
    showHouse.value=lastnew
  }else if (key == 3) {
    showHouse.value=price
  }
};


// 区域 
const areaList = ["不限",
  "天河",
  "越秀",
  "荔湾",
  "海珠",
  "番禺",
  "白云",
  "黄埔",
  "从化",
  "增城",
  "花都",
  "南沙",
];
const areaActiveClass = ref(0);
const areaItem = ref("天河");
const areaActive = (index, item) => {
  areaActiveClass.value = index;
  areaItem.value = item;
};

//方式
const approachList = ["不限", "整租", "合租"];
const approachActiveClass = ref(0);
const approachActive = (index) => {
  approachActiveClass.value = index;
};

//租金
const rentList = ["不限",
  "1000元以下",
  "1000-1500元",
  "1500-2000元",
  "2000-3000元",
  "3000-5000元",
  "大于5000元",
];
const rentActiveClass = ref();
const rentActive = (index) => {
  rentActiveClass.value = index;
};

//户型
const housetypeList = ["不限","一居", "二居", "三居", "四居+"];
const housetypeActiveClass = ref();
const housetypeActive = (index) => {
  housetypeActiveClass.value = index;
};

//租期
const dateList = ["不限","月租", "年租", "一个月起租", "1-3个月", "4-6个月"];
const dateActiveClass = ref();
const dateActive = (index) => {
  dateActiveClass.value = index;
};

</script>

<style scope>
.house-container {
  background-color: #fff;
  padding: 20px 10% 50px;
  .breadcrumb {
    padding-bottom: 20px;
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        cursor: pointer;
      }
    }
  }

  .area-wrapper {
    .area-item {
      display: flex;
      margin-bottom: 10px;
      .left {
        margin-right: 20px;
        font-weight: bold;
      }
      .right {
        display: flex;
        .area {
          margin: 0 15px;
          cursor: pointer;
        }
        .area:hover {
          color: rgb(48, 118, 246);
        }
        .area.active {
          color: rgb(48, 118, 246);
          font-weight: bold;
        }
      }
      .rent-input {
        margin-left: 20px;
        input {
          border: 1px solid rgb(237, 237, 237);
          width: 60px;
          height: 30px;
        }
        span {
          margin: 0 5px;
        }
        button {
          color: rgb(48, 118, 246);
          background-color: inherit;
          cursor: pointer;
        }
        button:hover {
          background-color: rgb(244, 248, 252);
        }
      }
    }
  }

  .res-wrapper {
    .res-head {
      display: flex;
      font-size: 16px;
      .left {
        margin-right: 30px;
        font-weight: bold;
        .res-count {
          color: rgb(48, 118, 246);
        }
      }
      .right {
        color: rgb(48, 118, 246);
        cursor: pointer;
      }
      .right:hover {
        text-decoration: underline;
      }
    }

    .res-main{
      padding-top:20px;
      .el-menu-demo{

      }

      .res-house{
        display: flex;
      }
    }
  }
}
</style>
