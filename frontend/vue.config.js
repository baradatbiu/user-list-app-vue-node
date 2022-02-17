module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: process.env.UL_API_URL,
      },
    },
  },
};
