<script setup>
</script>

<template>
  <router-view></router-view>
</template>

<style>

:root{
    --skyBlue: #a0d3f2;
    --deepBlue: #3760b6;
    --middleBlue: #a2b6e3;
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
}

html {
  font-size: 14px;
}

body,
html,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: #f5f6fa;
}

img {
  width: 100%;
}
</style>
