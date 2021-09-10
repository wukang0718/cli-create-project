/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require("./package.json");
process.env.VUE_APP_VERSION = pkg.version;
process.env.VUE_APP_DATE_TIME = new Date().toLocaleString();

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/scss/var.scss";
          @import "~@/assets/scss/mixin.scss";
          @import "~@/assets/scss/fun.scss";
        `,
      },
    },
  },
  devServer: {
    proxy: {
      "/aServer": {
        target: process.env.VUE_APP_A_BASE_URL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "/aServer": "",
        },
      },
      "/bServer": {
        target: process.env.VUE_APP_B_BASE_URL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "/bServer": "",
        },
      },
    },
  },
};
