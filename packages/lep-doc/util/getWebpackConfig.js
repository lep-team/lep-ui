const path = require("path");
const { getNodeEnv } = require(".");
const context = require('./context')
const getBabelConfig = require('./getBabelConfig')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const pkg = require('../package.json')
module.exports = function getWebpackConfig () {
  const config = context.getConfig();
  const babelConfig = getBabelConfig()
  const mode = getNodeEnv()
  const productPlugins = [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css',
    })
  ]
  return {
    mode,
    entry: path.resolve(__dirname, '../', '_template/index.js'),
    output: {
      path: config.output,
      filename: 'index.[contenthash:8].js',
      clean: true
    },
    resolve: {
      modules: [path.resolve(__dirname, '../../node_modules'), 'node_modules'],
      extensions: [
        '.js',
        '.jsx',
        '.json',
      ],
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: path.resolve(__dirname, '../node_modules/'),
          loader: require.resolve('babel-loader'),
          options: babelConfig
        },
        {
          test: /\.md?$/,
          exclude: path.resolve(__dirname, '../node_modules/'),
          loader: path.resolve(__dirname, '..', 'loader/md')
        },
        {
          test: /\.css$/,
          use: [mode === 'development' ? { loader: require.resolve("style-loader") } : MiniCssExtractPlugin.loader, { loader: require.resolve("css-loader") }],
        }
      ],
    },
    plugins: [
      ...(mode !== 'development' ? productPlugins : []),
      new WebpackBar({
        name: pkg.name
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../', "template/index.html")
      }),
    ]
  };
};
