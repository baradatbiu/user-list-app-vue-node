module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: process.env.UL_API_URL,
      },
    },
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/user-list-app-vue-node/" : "/",
};
