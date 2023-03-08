const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    console.log("app");
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:8080",
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin:true // 开启服务
    })
  );
};
