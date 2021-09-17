export default {
  path: "/result",
  name: "result",
  redirect: "/result/index",
  component: () => import(/* webpackName: "Layout" */ "@/layout/index.vue"),
  meta: {
    title: "测试结果列表",
  },
  children: [
    {
      path: "index",
      name: "resultIndex",
      component: () =>
        import(/* webpackName: "resultIndex" */ "@/views/result/index.vue"),
      meta: {
        title: "测试结果列表",
      },
    },
  ],
};
