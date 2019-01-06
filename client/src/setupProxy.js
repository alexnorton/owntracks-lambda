const dotenv = require('dotenv');
const proxy = require('http-proxy-middleware');

dotenv.config();

module.exports = function(app) {
  app.use(
    proxy('/api/', {
      target: process.env.API_ENDPOINT,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};
