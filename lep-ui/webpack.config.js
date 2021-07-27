const path = require('path')
const WebpackBar = require('webpackbar');
module.exports = {
  entry: './doc/pc/index.tsx',  //起始程序的起点入口
  // mode: 'development',   // development为开发者环境，production为生产环境变量 ，还有一个为none
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'yun',
    libraryTarget: 'umd'
  },
  devServer: {
    open: true,
    hot: true, //热更新插件
    inline: true, //实时刷新
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: {
      //browserHistory的时候，刷新会报404. 自动重定向到index.html
      index: "./index.html",
    },
  },
  resolve: {  //加载项配置
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg|eot|woff2|woff|ttf)$/,
        use: ['url-loader'],
      },
    ]
  },
}
