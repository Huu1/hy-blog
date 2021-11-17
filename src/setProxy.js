const proxySettings = {
  // 接口代理
  '/api': {
    target: 'http://localhost:3000/',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api': '',
    },
  },
};

module.exports = proxySettings;
