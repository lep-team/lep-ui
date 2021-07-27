const base = require('./webpack.config');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = Object.assign({}, base, {
  mode: 'development',   // development为开发者环境，production为生产环境变量 ，还有一个为none
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      title: 'Hello Webpack',
      template: './public/index.html'
    }),
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin()
  ],
})