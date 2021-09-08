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
};
