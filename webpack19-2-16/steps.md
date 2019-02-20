# webpack4
## 配置文件及基础配置
我们现在可以零配置webpack打包文件，但是我们发现他有很多局限性，比如说打包默认当前目录src下的index.js文件到dist目录下的main.js
那我们如何灵活的，随意地打包某个文件呢？我们就需要使用配置文件来满足我们更多的需求。
- 在根目录下新建 webpack.config.js 文件
- 在文件中配置他的输入口，输出口
- 在配置文件中配置打包模式：mode 分为开发模式 ``` development ``` 和生产模式 ```production```
```
let path = require('path');
module.exports = {
  mode: 'development',  // 模式 开发:development 生产:production
  entry: './src/index.js', // 打包入口文件
  output:{
    filename: 'bundle.js',   // 打包的文件
    path: path.resolve(__dirname, 'out') // 打包后的文件路径,绝对路径
  },
}
```
现在我们就可以通过 ```npx webpack``` 打包了。打包好以后引入到html文件中在浏览器打开应该就可以在控制台输出了。

## 命令台命令配置
我们都习惯用 npm run ...打包或者是启动
我们通过修改配置package.json实现, 将script替换
```
"script": {
  "bundle": "webpack"
}
```
或者我们自定义的配置文件名字，例如wepack.config.1.js
```
"script": {
  "bundle": "webpack --config webpack.config.1.js"
}
```
那现在我们就可以通过 ``` npm run bundle ``` 来打包。

## html
我们接下来可以直接将js打包到html文件，省的我们手动引入html，我们现在需要使用插件 ```html-webpack-plugin```
- 命令安装
```
npm install html-webpack-plugin -D
```
- 配置文件配置
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 在module.exports中配置插件 plugins
plugins: [
  new HtmlWebpackPlugin({
    template: './index.html', // 写入一个模板html
    filename: 'index.html'  // 生成的html
    title: '首页',  // html文档的标题
    inject: true, // js资源放在底部 默认 true
    // favicon: './img.png',  // 图标路径
    minify: true // 默认 会压缩
    hash: true // 将文件加上一个特殊哈希值，对清除缓存有用 默认false
    chunks: [] 解析某些块
  })
]
```
现在我们就可以通过 ```npx webpack ``` 打包直接在打包文件中直接生成了html文件，打开浏览器查看一切正常。

## webpackDevServer
这是一个开发服务，我们可以通过localhost的方式打开，就是通过ip地址的方式打开，
安装 webpack-dev-server
```
npm install webpack-dev-server -D
```
在配置文件中配置服务器
```
devServer:{
  port: 3000, // 端口
  progress: true, // 显示进程
  contentBase: './out', 
  // open: true
}
```
在 package.json 中配置，
```
"script": {
  "dev": "webpack-dev-server"
}
```
然后``` npm run dev ``` 启动。我们发现生成一个IP地址 ```http://localhost:3000/```
我们把他在浏览器打开，在控制台能够看见成功的输出了字符串。