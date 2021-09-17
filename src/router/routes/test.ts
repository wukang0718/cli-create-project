export default {
  path: "/test",
  name: "test",
  redirect: "/test/index",
  component: () => import(/* webpackName: "Layout" */ "@/layout/index.vue"),
  meta: {
    title: "测试集列表",
  },
  children: [
    {
      path: "index",
      name: "testIndex",
      component: () =>
        import(/* webpackName: "testIndex" */ "@/views/test/index.vue"),
      meta: {
        title: "测试集列表",
      },
    },
  ],
};
