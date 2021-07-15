const base = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = Object.assign({}, base, {
  mode: 'development',   // development为开发者环境，production为生产环境变量 ，还有一个为none
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hello Webpack',
      template: './public/index.html'
    })
  ],
})