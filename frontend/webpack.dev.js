const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    client: {
      logging: "info",
      overlay: true,
    },
    compress: true,
    open: true,
    static: "./build",
    proxy: {
      '/comparison-portal/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  stats: {
    errorDetails: true,
  },
});
