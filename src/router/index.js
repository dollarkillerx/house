import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/page/index/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/page/login/login.vue"),
  },
  {
    path: "/my",
    name: "my",
    component: () => import("@/page/my/my.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("@/page/detail/detail.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
