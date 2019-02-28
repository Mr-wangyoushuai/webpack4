
//webpack是node写出来的

const path = require('path');
module.exports = {
  mode: 'development', //模式  两种 development production
  entry: './src/index.js',
  output:{
    filename: 'bundle.js',   // 打包的文件
    path: path.resolve(__dirname, 'test') // 打包后的文件路径,绝对路径
  }
}