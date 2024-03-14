<template>
  <div class="hotHouse-container">
    <h2>热推房源</h2>
    <div class="hotHouse-main">
      <div class="hotHouse-card" v-for="(item, index) in hotHouseList" :key="index">
        <div class="cardimg">
          <img src="@/assets/house/house2.jpg" alt="" />
        </div>
        <div class="cardmain">
          <div class="tit">{{ item.rentway }}&nbsp;•&nbsp;{{ item.tit }}</div>
          <div class="sub">{{ item.address }}/{{ item.layout }}</div>
          <div class="price">
            <span>{{ item.price }}</span
            >/月
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 房子数据
const hotHouseList = [
  {
    img: "",
    rentway: "整租",
    tit: "宜安小区",
    address: "越秀",
    layout: "1室1厅1卫",
    price: "2600",
  },
  {
    img: "",
    rentway: "整租",
    tit: "宜安小区",
    address: "越秀",
    layout: "1室1厅1卫",
    price: "2600",
  },
  {
    img: "",
    rentway: "整租",
    tit: "宜安小区",
    address: "越秀",
    layout: "1室1厅1卫",
    price: "2600",
  },
];
</script>
<style scope>
.hotHouse-container {
  width: 180px;
  margin-left: 100px;
  margin-top: 20px;
  background-color: #fff;
  h2 {
  }
  .hotHouse-main {
    .hotHouse-card {
      margin-top: 15px;
      cursor: pointer;
      .cardimg {
        width: 100%;
        img {
        }

        img:hover {
          transition: 0.3s;
          transform: scale(1.1);
        }
      }
      .cardmain {
        .tit {
          font-weight: bold;
        }
        .sub {
          color: rgb(153, 157, 171);
        }
        .price {
          color: rgb(250, 87, 65);
        }
      }
    }
  }
}
</style>
