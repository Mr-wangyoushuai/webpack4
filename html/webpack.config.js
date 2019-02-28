
//webpack是node写出来的

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devServer: {
    port: 3000,
    progress: true,
    contentBase: './out',
    compress: true
  },

  mode: 'development', //模式  两种 development production

  entry: './src/index.js',

  output:{
    filename: 'bundle.js',   // 打包的文件
    path: path.resolve(__dirname, 'out') // 打包后的文件路径,绝对路径
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true
      }
    })
  ]
}