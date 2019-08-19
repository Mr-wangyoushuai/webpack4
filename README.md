# webpack 4
``` yarn init -y``` 初始化一个配置文件

建立一个webpack.config.js文件

``` yarn add webpack webpack-cli -D ``` 

安装```webpack webpack-cli```
进行入口 输出的配置 还有模式（development/ production）

``` npx webpack ```    启动

``` yarn add webpack-dev-server -D``` 

配置devServer
在webpack.config.js中配置 ```devServer:{port:2000,progress:true}```等选项

通过脚本执行在package.json中配置scripts选项
``` 
"scripts": "{
    "build" : "webpack",
    "dev": "webpack-dev-serer"
}"
```
## html
```yarn add html-webpack-plugin -D``` 配置html插件

```
const HtmlWebpackPlugin = require('html-webpack-plugin');

new HtmlWebpackPlugin({
    template: './index.html', // template 和filename 值需要相等
    filename: 'index.html',
    minify: {
        removeAttributeQuotes: true,
    },
    hash: true
})
```

## 引入css
- 在入口文件中引入css文件
``` yarn add css-loader style-loader -D ```
```
{test: /\.css$/, use: ['style-loader','css-loader']}
```
css-loader 解析css路径 @import
style-loader 把css放到style标签中 再放入到head标签中
- less解析 
``` yarn add less less-loader -D```
```
{test: /\.css$/, use: ['style-loader','css-loader','less-loader']}
```
* 配置中loader顺序需要和解析的顺序相反

### 抽离css文件(插件)
``` yarn add mini-css-extract-plugin -D```
```
const ExtractCss = require('mini-css-extract-plugin');

module -> rules 配置
{test: /\.css$/, use: [{loader: ExtractCss.loader,},'css-loader']}, // 字符串也可以传成对象 {loader：'style-loader'}
    {test: /\.less$/,use:[
        ExtractCss.loader, // style标签放到head标签内
        'css-loader', // @import 解析路径
        'less-loader' // 需要less less-loader 解析less文件
]}

// plugins配置
new ExtractCss({
    filename: 'main.css'
    // moduleFilename: ({name}) => `${name.replace('/js/', '/css/')}.css`
    // chunkFilename: '[name].css',
    // ignoreOrder: false // 忽略顺序冲突
})
```
### 自动添加前缀
``` yarn add postcss-loader autoprefixer -D ```

postcss-loader放到css-loader后面
```
{test: /\.css$/, use: [{loader: ExtractCss.loader,},'css-loader','postcss-loader']}
```
建一个postcss.config.js文件
写入
```
module.exports ={
    plugins:[
        require('autoprefixer')
    ]
}
```
在package.json中配置
```
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
```

#### 压缩css文件(插件)
``` yarn add optimize-css-assets-plugin -D```

代码配置
```
const OptimizeCss  = require('optimize-css-assets-webpack-plugin');

optimization:{
    minimizer: [new OptimizeCss({})]
}
```
#### 解决css压缩js不压缩问题
 ``` yarn add terser-webpack-plugin -D```

配置
```
const Terser = require('terser-webpack-plugin');

optimization:{
    minimizer: [new Terser(), new OptimizeCss({})]
}
```
- 还有一种方法是[uglify](https://www.npmjs.com/package/uglifyify), 如果没有配置babel js可能会报错
* 中间碰到 autoprefixer 没有生效是因为没有配置browserslist选项

## 配置js
es6，7 ——> es5
使用babel
- 基础配置

``` yarn add babel-loader @babel/core @babel/preset-env -D ```

core 核心代码
preset-env转es5

``` 
{
    test: /\.js$/, 
    use:{
        loader: 'babel-loader',
        presets: [
            '@babel/preset-env'
        ]
    }
}
```
- 识别 class类

``` yarn add @babel/plugin-proposal-class-properties -D ```

配置
```
在use下 配置
plugins:['@babel/plugin-proposal-class-properties']
```

- 修饰器
@log
class A{
    a: 1;
}
function log ( target ){
    console.log(target)
}
``` yarn add @babel/plugin-proposal-decorators -D ```
配置
```
plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
]
```
这样就可以识别@log
- 识别generate promise等函数 抽离函数
``` 
yarn add @babel/plugin-transform-runtime -D 
yarn add @babel/runtime -S
```
    1. plugin-transform-runtime 是开发依赖
    2. runtime 是生产依赖
- 识别includes等高级语法

``` yarn add @babel/polyfill```

可以通过 require() 引用
- eslint    
``` yarn add eslint eslint-loader -D ```

配置

```
 {
    test: /\.js$/,
    use: {
        loader: 'eslint-loader',
        options:{
            enforce: 'pre' // 强制先执行 // post 后执行
        }
    }
},
```
## 全局变量引入
- 引入jquery
```
yarn add jquery
```
在文件中``` import $ from 'jquery'```

可以访问到 ```$```，但是不可以访问到 ``` window.$```
- 暴露全局对象

我们可以使用内联loader
```
yarn add expose-loader
```

改变引入方式

```
import $ from 'expose-loader?$!jquery'
```
这时已经将jquery暴露到window对象上了

这时可以访问到，exposed-loader 暴露全局的loader  内联loader 可以挂在window上

- 我们也可以配置到rules中
```
{
    test: require.resolve('jquery'),
    use: 'expose-loader?$'
}
```
在文件中
```
import $ from 'jquery'
```
这时也可以访问到window.$
- 注入到每个模块中
用wabpack插件 这个能拿到$ 不能拿到window.$
```
const webpack = require('webpack');
```
在插件中配置

```
new webpack.ProvidePlugin({
    $: 'jquery'
})
```
- 通过cdn引入
通过cdn引入，再通过import，打包的时候会把jquery也给打包

## 引入图片
css中的路径 已经被解析了css-loader
在js中引入图片 在主入口引入图片

```
将图片import进来 img1
let img = new Image();
img.src = img1;
document.body.append(img)
```

这样引入不会解析路径, 需要一个loader
- 我们来引入file-loader

``` 
yarn add file-loader -D
```

配置

```
{
    test: /\.(jpg|png|gif)/,
    use: {
        loader: 'file-loader',
    }
},
```
file-loader 会生成一张图片通过路径将他引入
- 当我们小图片的时候，我们不需要多一次http请求，我们可以把小图片生成base64,现在我们需要loader：url-loader

```
yarn add url-loader -D
```

配置

```
{
    test: /\.(jpg|png|gif)/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 20*1024 // 大于20k的使用file-loader解析生成图片
        }
    }
    },
```
- 现在我们css js中都能引入图片了 但是我们的html文件中img引入还有问题

我们还是用一个loader来解决他

```
yarn add html-withimg-loader -D
```

配置

```
{
    test: /\.html$/,
    use: 'html-withimg-loader'
}
```
这样我们图片就完成打包了

## 多页面打包
多页面打包我们需要多个html，多个入口文件，和多个出口文件

- 多个html，我们可以使用html-webpack-plugin插件 进行多次new
例如

```
new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html'
    chunks:['home','animate']
})
new HtmlWebpackPlugin({
    filename: 'about.html',
    template: './index.html'
    chunks:['about','animate','dropdown']
})
```

chunks代表要打包的js模块 不同的html可以分别配置

- entry,output配置
entry 可以用对象配置
```
entry: {
    home: './home.js',
    about: './about.js'
},
output: {
    filename: '[name].[hash].js', // 根据名字生成js模块
    path: path.resolve(__dirname, 'dist')
}
```
## sourceMap 
———— 调试源码
源码映射 报错可以定位到源码的位置
在配置文件中配置
```
devtool: 'source-map' // 增加映射文件，可以帮我们调试源码 可以显示行和列
```
devtool其他的值
- 1. eval-source-map 不会产生单独的文件，但可以显示行和列
- 2. cheap-module-source-map 不会产生列 但是是一个单独的映射文件
- 3. cheap-module-eval-source-map 不产生单独文件 集成在打包的文件中 不会产生列

## watch 
———— 监控代码修改
配置 watch: true 还有watch选项配置
```
watchOptions:{
    poll: 1000,  // 每秒1000次询问
    aggregateTimeout: 500 // 防抖 500ms不输入监控打包
    ignored: /node_modules/  // 忽略打包的文件
}
```

## webpack小插件
- ``` yarn add clean-webpack-plugin -D```  在打包前清空输出

配置

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
在plugins中
new CleanWebpackPlugin()
```

- ```yarn add copy-webpack-plugin -D``` 复制代码 不需要打包

```
const CopyWebpackPlugin = require('copy-webpack-plugin');
在plugins
new CopyWebpackPlugin()
```
## webpack 跨域问题
- 前端跨域问题

```
index.js

var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/use, true);
xhr.onload = function (){
    console.log(xhr.response);
}
xhr.send()
```
```
devServer: {
    proxy: {
        '/api': { // 匹配api请求
            target: 'http://localhost:3000'，
            pathRewrite:{
                '/api': '', // 将路径上api替换成空
            }
        }
    }
}
```
- 模拟数据 （不存在跨域）
```
devServer: {
    before(app){
        app.get('/user', (res, req) => {
            res.json({name: 'zhangsan'})
        })
    }
}
```
在before中写入模拟数据

- 自己的后端服务也在项目中，启动服务端连带启动

需要一个node中间件 webpack-dev-middleware
```
// 新建server.js

const express = requrie('express');

const middleware = require('middleware');

const webpack = require('webpack');

let config = require('./webpack.config.js');

let app = new express();

let webpackConfig = webpack(config);

app.use(middleware(webpackConfig));

app.get('/user',(res, req)=>{
    res.json({name: 'zhangsna"})
})

app.listen(3002);
```
然后我们运行node server.js
起动之后端口3002，我们可以看到数据我们可以访问到，页面也可以正常显示出来

## resolve
```
resolve:{
    mainFields: ['style', 'main'] 先解析 packge.js style字段中的东西 在解析 main中的
    extensions: ['css', 'js', 'vue'], // 当你import 的时候没加后缀 这就是解析的顺序，先解析css 如果没有在解析js
    alias: {
        bootstrap: 'bootstrap/dist/css/index.css' // 可以用bootstrap 引入此路径的文件
    }
}
```
## 定义环境变量
使用webpack内置的插件

引入webpack

配置

``` 
// 在plugins中配置

new webpack.DefinePlugin({
    DEV: JSON.stringify('production'); // 如果为字符串 默认是一个变量 通过JSON.stringify()转化为字符串
    FLAG: 'true'  // 默认为 是boolean类型
    EXPRESSION: '1 + 1' 是表达式 不是字符串 // 所以是2
})
```

## 分成不同的环境变量
区分生产环境和开发环境
- 1. 建立webpack.dev.conf.js和webpack.prod.conf.js 并且引入 webpack.config.js -> config
- 2. 安装webpack-merge ``` yarn add webpack-merge -D```
合并
```
module.exports = merge(config,{
    mode: ENV_NODE_DEV
})
```
# webpack优化

## noParse
忽略 引入第三方包内的依赖文件

在module下配置
```
noParse: /jquery/
```

## ignorePlugin
这是webpack中自带的插件
```
new webpack.ignorePlugin(/\.\/locale/, /moment/) // 表示引入moment包的的时候 忽略./locale文件（语言包）需要的时候需要自行引入 比如 import 'moment/locale/zh-cn';
```
## dllPlugin 
动态链接库

我们来打包一下 react react-dom 打包比较大，我们可以把他单独打包，不用在项目每次打包的时候进行打包。

我们新建一个打包配置文件webpack.test.config.js

进行配置：
```
const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]'
        // library Target: 'var' // 'umd' 'commonjs' 'this' ...
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', 'manifest.json')
        })
    ]
}
```
这样我们执行 npm run build -- --config webpack.test.config.js
就会在dist目录下生成动态链接库 _dll_react.js 以及 manifest.json 清单

接下来我们在我们的项目中引入 需要在index.html中引入 然后在我们的webpack配置中配置

```
new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, 'dist', 'manifest.json')
})
```

## happypack
作用：多线程打包 项目比较大时可以使用加快打包速度

安装：
```
yarn add happypack -D
```

配置：
```
const Happypack = require('happypack');

在js打包规则中配置
use: 'Happypack/loader?id=js'
在plugins中
new Happypack({
    id: 'js',
    use:[
        {
            // 打包用的loader
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react'
                ]
            }
        }
    ]
})
```
css 使用方法相同

## webpack自带的优化
- tree shaking

import 导入，没有的代码不打包

require 导入，es6模块导出，不会
- scoped hosting 作用域提升

在webpack中可以自动简化一些代码 

let a = 1;
let b =2;
let c = a + b;
console.log(c)
直接解析结果

## 懒加载
import es草案中的语法，

jsonp实现动态加载文件

```
import ('./test.js').then( data => {
    console.log(data.default)
})
```

## 热更新

- devServer hot: true
- new webpack.HotModuleReplacePlugin()

```
if(module.hot){
    module.hot.accept('./test.js',() => {
        console.log('文件更新了')
    })
}













