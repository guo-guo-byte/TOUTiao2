import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    name: "Login",
  },
  {
    path: "/demo",
    component: () => import("@/views/demo.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "wenda",
        component: () => import("@/views/wenda/index.vue"),
      },
      {
        path: "video",
        component: () => import("@/views/video/index.vue"),
      },
      {
        path: "my",
        component: () => import("@/views/my/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
