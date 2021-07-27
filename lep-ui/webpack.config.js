const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './lib/index.tsx',  //起始程序的起点入口
  // mode: 'development',   // development为开发者环境，production为生产环境变量 ，还有一个为none
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'yun',
    libraryTarget: 'umd'
  },
  resolve: {  //加载项配置
    extensions: ['.ts', '.tsx','.js', '.jsx']
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
    ]
  },
}
