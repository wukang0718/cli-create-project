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
