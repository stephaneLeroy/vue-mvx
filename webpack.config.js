const dev = require("./webpack/webpack.config.dev")
const lib = require("./webpack/webpack.config.lib")

let webpackConfig = lib;
if (process.env.NODE_ENV === 'development') {
  webpackConfig = dev;
}
module.exports = webpackConfig;
