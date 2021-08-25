const path = require('path');
const { getNodeEnv } = require('.');
const context = require('./context');
const getBabelConfig = require('./getBabelConfig');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const pkg = require('../package.json');
module.exports = function getWebpackConfig() {
  const config = context.getConfig();
  const babelConfig = getBabelConfig();
  const mode = getNodeEnv();
  const productPlugins = [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css'
    })
  ];
  return {
    mode,
    devtool: mode === 'development' ? 'eval-cheap-module-source-map' : 'none',
    entry: path.resolve(__dirname, '../', '_template/index.js'),
    output: {
      path: config.output,
      filename: 'index.[contenthash:8].js',
      clean: true,
      publicPath: '/'
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.json']
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: path.resolve(__dirname, '../'),
          loader: require.resolve('babel-loader'),
          options: babelConfig
        },
        {
          test: /\.md?$/,
          exclude: /node_modules/,
          loader: path.resolve(__dirname, '..', 'loader/md')
        },
        {
          test: /\.css$/,
          use: [
            mode === 'development'
              ? { loader: require.resolve('style-loader') }
              : MiniCssExtractPlugin.loader,
            { loader: require.resolve('css-loader') }
          ]
        },
        {
          test: /\.less$/,
          use: [
            mode === 'development'
              ? { loader: require.resolve('style-loader') }
              : MiniCssExtractPlugin.loader,
            { loader: require.resolve('css-loader') },
            { loader: require.resolve('less-loader') }
          ]
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            mode === 'development'
              ? { loader: require.resolve('style-loader') }
              : MiniCssExtractPlugin.loader,
            { loader: require.resolve('css-loader') },
            { loader: require.resolve('sass-loader') }
          ]
        }
      ]
    },
    plugins: [
      ...(mode !== 'development' ? productPlugins : []),
      new WebpackBar({
        name: pkg.name
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../', '_template/index.html')
      })
    ],
    snapshot: {
      managedPaths: []
    }
  };
};
