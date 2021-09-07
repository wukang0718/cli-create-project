module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "element-plus",
        // 引入组件
        customName: (name) => {
          name = name.slice(3);
          return `element-plus/lib/components/${name}`;
        },
      },
    ],
  ],
};
