export default {
  path: "/project",
  name: "project",
  redirect: "/project/index",
  component: () => import(/* webpackName: "Layout" */ "@/layout/index.vue"),
  meta: {
    title: "项目列表",
  },
  children: [
    {
      path: "index",
      name: "projectIndex",
      component: () =>
        import(/* webpackName: "projectIndex" */ "@/views/project/index.vue"),
      meta: {
        title: "项目列表",
      },
    },
    {
      path: "lookTests",
      name: "projectLookTests",
      component: () =>
        import(
          /* webpackName: "projectLookTests" */ "@/views/project/lookTests.vue"
        ),
      meta: {
        title: "查看关联项目集",
      },
    },
  ],
};
