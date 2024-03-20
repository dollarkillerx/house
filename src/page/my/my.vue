<template>
    <div class="my-container">
        <div class="my-top">
            <div class="my-top-left">
                <van-image fit="cover" round width="1.5rem" height="1.5rem"
                    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />

            </div>
            <div class="my-top-right">
                <div class="my-top-right1">
                    <span>登录/注册</span>
                    <i></i>
                </div>
                <div class="my-top-right2">点击登录/注册</div>
            </div>
        </div>
        <div class="my-content"></div>
    </div>
    <tabBar></tabBar>
</template>
<script setup>
import { ref, reactive, toRef } from "vue";
import tabBar from "../../components/tabbar/tabbar.vue"
</script>
<style scope>
.my-container {
    .my-top {
        display: flex;
        padding: 100px 0 20px 30px;
        font-size: 16px;
        background-color: var(--skyBlue);

        .my-top-left {
            margin-right: 20px;
        }

        .my-top-right {
            .my-top-right1 {
                font-weight: bold;
            }

            .my-top-right2 {
                color: gray;
                font-size: 14px;
            }
        }
    }

    .my-content {
        width: 80%;
        margin: 0 auto;
        background-color: #fff;
    }
}
</style>