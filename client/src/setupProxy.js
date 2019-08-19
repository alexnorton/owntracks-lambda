const dotenv = require("dotenv");
const proxy = require("http-proxy-middleware");

dotenv.config();

module.exports = function(app) {
  if (process.env.REACT_APP_API_ENDPOINT[0] !== "/") {
    app.use(
      proxy("/api/", {
        target: process.env.REACT_APP_API_ENDPOINT,
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      })
    );
  }
};
