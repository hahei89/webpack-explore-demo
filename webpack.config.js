const path = require('path')
const webpack = require('webpack')
// 清理构建文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 自动生成HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: { bundle: './src/index.js' },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpeg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'js/[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/', // 可以直接写/dist
    hotOnly: true,
    compress: true,
    open: true,
    writeToDisk: true,
    // useLocalIp: true, // 浏览器报错
    proxy: {
      api: 'http://localhost:3000'
      /* 'api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        }
      } */
    }
    // host: '127.0.0.1' // 修改dev server的host
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      /* 使得每次webpack-dev-server打包之后，index.html文件仍然保留 */
      cleanStaleWebpackAssets: false
    }),
    new HtmlWebpackPlugin({
      title: 'webpack for react',
      template: 'public/index.html'
    })
  ]
}
