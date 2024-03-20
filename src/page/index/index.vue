<template>
    <van-search v-model="searchVal" placeholder="请输入搜索关键词" />
    <div class="index-container">
        <div class="index-top">
            <van-dropdown-menu active-color="#3760b6" swipe-threshold="4">
                <van-dropdown-item v-model="menuVal.menuVal1" :options="menuOpt.menuOpt1" />
                <van-dropdown-item v-model="menuVal.menuVal2" :options="menuOpt.menuOpt2" />
                <van-dropdown-item v-model="menuVal.menuVal3" :options="menuOpt.menuOpt3" />
                <van-dropdown-item v-model="menuVal.menuVal4" :options="menuOpt.menuOpt4" />
                <van-dropdown-item v-model="menuVal.menuVal5" :options="menuOpt.menuOpt5" />
            </van-dropdown-menu>
        </div>
        <div class="index-content">
            <van-card @click="gotoDetail" v-for="(item, index) in houseList.house" :key="index" class="index-content-card"
                :price="item.price + '万/月'" :desc="item.subtit" :title="item.title" :thumb="item.src">
                <template #tags>
                    <van-tag plain type="primary">{{ item.direction }}</van-tag>
                    <van-tag plain type="primary">{{ item.staircase }}</van-tag>
                </template>
                <template #footer>
                    <van-button size="mini">查看详情</van-button>
                    <van-button size="mini">去租房</van-button>
                </template>
            </van-card>

        </div>
    </div>
    <tabBar></tabBar>
</template>
<script setup>
import tabBar from "../../components/tabbar/tabbar.vue"
import { ref, reactive, toRef } from "vue";
import { useRouter } from 'vue-router';
import houseList from '../../data/houseList.json'

//去详情页
const router = useRouter();
function gotoDetail() {
    router.push('/detail');
}

//搜索框
const searchVal = ref('');

//选择菜单
const menuValue = reactive({
    menuVal: {
        menuVal1: 0,
        menuVal2: 0,
        menuVal3: 0,
        menuVal4: 0,
        menuVal5: 0,
    },
    menuOpt: {
        menuOpt1: [
            { text: '位置', value: 0 },
            { text: '新款商品', value: 1 },
            { text: '活动商品', value: 2 },
        ],
        menuOpt2: [
            { text: '户型', value: 0 },
            { text: '好评排序', value: 1 },
            { text: '销量排序', value: 2 },
        ],
        menuOpt3: [
            { text: '租金', value: 0 },
            { text: '好评排序', value: 1 },
            { text: '销量排序', value: 2 },
        ],
        menuOpt4: [
            { text: '筛选', value: 0 },
            { text: '好评排序', value: 1 },
            { text: '销量排序', value: 2 },
        ],
        menuOpt5: [
            { text: '排序', value: 0 },
            { text: '好评排序', value: 1 },
            { text: '销量排序', value: 2 },
        ],
    }
}
)

const menuVal = toRef(menuValue, 'menuVal');
const menuOpt = toRef(menuValue, 'menuOpt');

</script>
<style scope>
.index-container {
    .index-top {}

    .index-content {
        .index-content-card {
            background-color: #fff;
            padding-top: 20px;
        }
    }
}
</style>