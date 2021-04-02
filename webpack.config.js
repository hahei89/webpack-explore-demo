const path = require('path')
const webpack = require('webpack')
// 清理构建文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 自动生成HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离CSS文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置运行环境
const mode = process.env.NODE_ENV
const plugins = []
if (mode !== 'production') {
  // 设置热更新插件只在开发模式下启用,HMR决不能用在生产环境中
  const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin()
  plugins.push(hotModuleReplacementPlugin)
}

module.exports = {
  entry: { bundle: './src/index.js' },
  mode,
  devtool: mode === 'development' ? 'eval-source-map' : 'none',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
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
    filename: 'js/[name].js',
    /* 避免HotModuleReplacementPlugin每次都生成不同的描述文件json和补丁文件js */
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
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
    ...plugins,
    new CleanWebpackPlugin({
      /* 使得每次webpack-dev-server打包之后，index.html文件仍然保留 */
      cleanStaleWebpackAssets: false
    }),
    new HtmlWebpackPlugin({
      title: 'webpack for react',
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ]
}
