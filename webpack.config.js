const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
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
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'), 
    port: 3000,
    publicPath: 'http://localhost:3000/dist', // 可以直接写/dist
    hotOnly: true,
    compress: true,
    open: true,
    writeToDisk: true,
    // useLocalIp: true, // 浏览器报错
    proxy: {
      'api': 'http://localhost:3000'
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
    new webpack.HotModuleReplacementPlugin()
  ]
}
