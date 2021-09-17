import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import Routes from "./routes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/project/index",
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
  ...Routes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
