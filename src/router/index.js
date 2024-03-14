import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    //登录
    path: "/",
    name: "login",
    component: () => import("@/pages/login/login.vue"),
  },
  {
    //首页
    path: "/index",
    name: "index",
    component: () => import("@/pages/index/index.vue"),
    redirect: "house",
    children: [
      {
        //找房
        path: "/house",
        name: "house",
        component: () => import("@/pages/house/house.vue"),
      },
      {
        //详情页
        path: "/house-detail",
        name: "house-detail",
        component: () => import("@/pages/house-detail/house-detail.vue"),
      },
      {
        //修改资料
        path: "/my",
        name: "my",
        component: () => import("@/pages/my/my.vue"),
      },
    ],
  },
  {
    //确认租房
    path: "/confirm-rent",
    name: "confirm-rent",
    component: () => import("@/pages/confirm-rent/confirm-rent.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
