<template>
  <router-view />
</template>

<script>

export default {
};
</script>

<style>
@import "assets/icon/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(245, 245, 246);
}

/* 去除默认样式 */
body,
h1,
h2,
p,
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

a,
a:hover {
  text-decoration: none;
}

input,
button {
  border: none;
  outline: none;
}
/* 设置基本样式 */
body {
  font-family: "Arial", sens-serif;
  line-height: 1.6;
  background-color: #fff;
}

html {
  font-size: 14px;
  /* overflow: hidden; */
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}

img {
  width: 100%;
}

/* 返回按钮 */
.return {
  position: absolute;
  top: 20px;
  right: 20px;
  background: inherit;
  font-weight: bold;
  font-size: 16px;
  color: rgb(48, 114, 246);
}

/* 房子卡片样式 */
.card {
  display: flex;
  margin-bottom: 15px;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  .card-left {
    width: 180px;
    margin-right: 25px;
    height: 135px;
    img {
      border-radius: 6px;
      height: 100%;
    }
  }
  .card-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    .tit {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 12px;
    }
    .sub {
      font-size: 16px;
      font-weight: bold;
      color: rgb(147, 153, 165);
      margin-bottom: 12px;
      span {
      }
    }
    .tag {
      display: flex;
      span {
        background-color: rgb(242, 245, 247);
        color: rgb(132, 154, 174);
        margin-right: 15px;
        padding: 4px 6px;
      }
    }
  }
  .card-right {
    font-size: 20px;
    color: rgb(250, 87, 65);
    span {
      font-weight: bold;
      font-size: 24px;
      margin-right: 4px;
    }
  }
}

.card:hover {
  background-color: rgb(242, 245, 247);
}
</style>

