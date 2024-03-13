<template>
  <div class="house-detail-container">
    <div class="section-wrapper">
      <div class="info-section section">
        <h2 class="head">
          {{ titList.rentway }}• {{ titList.tit }}&nbsp;
          {{ titList.layout }}&nbsp; {{ titList.direction }}&nbsp;
        </h2>
        <router-link class="return" to="/house">返回 </router-link>
        <div class="main">
          <div class="left">
            <el-carousel class="img-carousel">
              <el-carousel-item
                v-for="item in 4"
                :key="item"
                class="img-carousel-item"
              >
                <img src="@/assets/house/house1.jpg" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="right">
            <div class="price">
              <span>{{ titList.price }}</span>
              元/月
            </div>
            <div class="tag">
              <span v-for="(item, index) in titList.tag" :key="index">{{
                item
              }}</span>
            </div>
            <div class="info-wrapper">
              <div class="info">
                <div class="info-tit">租赁方式：</div>
                <div class="info-main">{{ titList.rentway }}</div>
              </div>
              <div class="info">
                <div class="info-tit">房屋类型：</div>
                <div class="info-main">
                  {{ titList.layout }}&nbsp; {{ titList.square }}&nbsp;
                  {{ titList.tag.tag2 }}
                </div>
              </div>
              <div class="info">
                <div class="info-tit">朝向楼层：</div>
                <div class="info-main">
                  {{ titList.direction }}&nbsp;
                  {{ titList.staircase }}
                </div>
              </div>
              <div class="info">
                <div class="info-tit">更多信息：</div>
                <div class="info-main info-tips">用户风险提示</div>
              </div>
            </div>
            <div class="btn">
              <button class="collect" type="button" @click="collectHouse">
                {{ collect }}
              </button>
              <button class="rentHouse" type="button" @click="gotoConfirm">
                租房
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="facility-section section">
        <h2 class="head">配套设施</h2>
        <div class="facility-main">
          <div
            class="facility-item"
            v-for="(item, index) in iconList"
            :key="index"
          >
            <span class="iconfont" :class="item.class"></span>
            <span>{{ item.tit }}</span>
          </div>
        </div>
      </div>
      <div class="picture-section section">
        <h2 class="head">房源描述</h2>
        <div class="picture-main">
          <img src="@/assets/house/house1.jpg" alt="" />
          <img src="@/assets/house/house2.jpg" alt="" />
          <img src="@/assets/house/house3.jpg" alt="" />
          <img src="@/assets/house/house4.jpg" alt="" />
          <img src="@/assets/house/house1.jpg" alt="" />
          <img src="@/assets/house/house2.jpg" alt="" />
        </div>
      </div>
      <div class="map-section section">
        <h2 class="head">地址和交通</h2>
        <div class="main">
          
        </div>
      </div>
    </div>
    <hotHouse></hotHouse>
  </div>
</template>
<script setup>
import { ref } from "vue";
import hotHouse from "@/components/hotHouse";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

function gotoConfirm() {
  router.push("/confirm-rent");
}

// 房子信息
const titList = ref({
  img: "",
  rentway: "整租",
  tit: "站西路",
  address: "越秀-流花站前-站西路",
  square: "70m平方",
  direction: "东南",
  layout: "2室1厅1卫",
  price: "2000",
  staircase: "高楼层/6层",
  tag: {
    tag1: "近地铁",
    tag2: "精装",
    tag3: "随时看房",
  },
});

// 图片列表
const houseImgList = [];

//设施图标
const iconList = [
  {
    tit: "洗衣机",
    class: "icon-xiyiji1",
  },
  {
    tit: "空调",
    class: "icon-kongtiao",
  },
  {
    tit: "衣柜",
    class: "icon-yigui",
  },
  {
    tit: "电视",
    class: "icon-dianshiji",
  },
  {
    tit: "冰箱",
    class: "icon-bingxiang",
  },
  {
    tit: "热水器",
    class: "icon-reshuiqi",
  },
  {
    tit: "床",
    class: "icon-chuang",
  },
  {
    tit: "暖气",
    class: "icon-nuanqi",
  },
  {
    tit: "宽带",
    class: "icon-kuandai",
  },
  {
    tit: "天然气",
    class: "icon-tianranqi",
  },
];

// 关注房子
const collectSuccess = () => {
  ElMessage({
    message: "关注成功",
    type: "success",
  });
};
const collectCanel = () => {
  ElMessage({
    message: "取消关注",
    type: "warning",
  });
};
const collect = ref("关注");
const collectHouse = () => {
  if (collect.value == "关注") {
    collect.value = "已关注";
    collectSuccess();
  } else if (collect.value == "已关注") {
    collect.value = "关注";
    collectCanel();
  }
};
</script>
<style scope>
.house-detail-container {
  display: flex;
  padding: 0 10%;
  padding-right: 16%;
  background: #fff;
  .section-wrapper {
    /* padding: 0 15% 20px; */
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    .section {
      width: 100%;
      padding-top: 20px;
      .head {
        margin-bottom: 15px;
      }
    }

    .info-section {
      position: relative;

      .main {
        display: flex;
        height: 225px;
        .left {
          width: 300px;
          margin-right: 20px;
          .el-carousel {
            height: 100%;
            .el-carousel__container {
              .el-carousel__item {
                img {
                  width: 300px;
                }
              }
            }
            .el-carousel__indicators--horizontal {
              display: flex;
              justify-content: center;
            }
          }
        }
        .right {
          flex: 1;
          .price {
            color: rgb(250, 87, 65);
            margin-bottom: 6px;
            span {
              font-weight: bold;
              font-size: 20px;
            }
          }
          .tag {
            padding-bottom: 10px;
            margin-bottom: 10px;
            border-bottom: 1px solid rgb(235, 237, 244);
            span {
              background-color: rgb(242, 245, 247);
              color: rgb(132, 154, 174);
              margin-right: 15px;
              padding: 4px 6px;
            }
          }
          .info-wrapper {
            .info {
              display: flex;
              .info-tit {
                color: rgb(155, 157, 163);
              }
              .info-main {
              }
              .info-tips {
                color: rgb(48, 114, 246);
                border-bottom: 1px solid rgb(48, 114, 246);
                cursor: pointer;
              }
            }
          }
          .btn {
            margin-top: 20px;
            button {
              padding: 5px 30px;
              font-weight: bold;
              color: rgb(48, 114, 246);
              border: 1px solid rgb(48, 114, 246);
              background-color: rgb(232, 240, 254);
            }
            button:hover {
              color: #fff;
              background-color: rgb(48, 114, 246);
            }
            .collect {
              margin-right: 10px;
            }
            .rentHouse {
            }
          }
        }
      }
    }

    .facility-section {
      .head {
        color: rgb(112, 119, 135);
      }
      .facility-main {
        display: flex;
        flex-wrap: wrap;
        .facility-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 15px;
          width: 82px;
          .iconfont {
            font-size: 36px;
          }
          span {
            margin-top: 10px;
          }
        }
      }
    }

    .picture-section {
      .picture-main {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        img {
          width: 285px;
        }
      }
    }

    .map-section {
    }
  }
}
</style>
